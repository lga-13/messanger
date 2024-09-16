/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './event-bus.ts';

export default abstract class Block<Props extends Record<string, any> = {}> {
  static EVENTS: {INIT: string, FLOW_CDM: string, FLOW_RENDER: string, FLOW_CDU: string} = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  _id: string;

  _element: HTMLElement;

  _meta: {tagName: string, props: Props};

  currentEvents: Record<string, (event?: Event) => void>;

  props: Props;

  children: Record<string, Block | Block[] | null>;

  eventBus: () => EventBus;

  constructor(tagName: string = 'div', propsAndChildren: object = {}) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    const { children, props } = Block._getChildren(propsAndChildren);
    this.children = children;
    this._meta = {
      tagName,
      props: props as Props,
    };
    if (props.settings && props.settings.withInternalID) {
      this._id = makeUUID();
      this.props = this._makePropsProxy({ ...props, __id: this._id } as Props & { __id: string; settings?: any; });
    } else {
      this.props = this._makePropsProxy(props as Props);
    }
    eventBus.emit(Block.EVENTS.INIT);
  }

  addChildren() {
  }

  static _getChildren(propsAndChildren: {}): {children: Record<string, Block | Block[]>, props: {
      settings?: any;
    } } {
    const children: Record<string, Block | Block[]> = {};
    const props: Record<string, any> = {};
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (value instanceof Array && value.every((item) => item instanceof Block)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props };
  }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
  }

  _makePropsProxy(props: Props) {
    const self: Block<Props> = this;
    return new Proxy(props, {
      get(target: Props, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Props, prop: string, value) {
        // Копируем текущие пропсы
        const oldProps: Props = { ...self.props };
        (target as any)[prop] = value;

        self.componentDidUpdate(oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string): HTMLElement | HTMLTemplateElement {
    const element = document.createElement(tagName);
    if (tagName === 'template') {
      return <HTMLTemplateElement>element;
    }
    if (element instanceof HTMLElement) {
      if (this._id) {
        element.setAttribute('data-id', this._id);
      }
      return element;
    }
    throw new Error('Передан неверный тег элемента');
  }

  _createResources() {
    if (this._meta && this._meta.tagName) {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    } else {
      throw new Error('Нет данных для создания элемента.');
    }
  }

  _init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    const response = oldProps !== newProps;
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    return response;
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      if (child instanceof Block) {
        child.dispatchComponentDidMount();
      }
    });
  }

  componentDidMount() {}

  get element() {
    // Геттер элемента
    return this._element;
  }

  getContent() {
    return this.element;
  }

  setProps = (nextProps: Record<string, any>) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  _render() {
    const block = this.render();
    this._removeEvents();
    this._element.innerHTML = '';
    if (block instanceof Node) {
      this._element.appendChild(block);
    } else {
      throw Error('Ошибка render');
    }

    this.addEvents();
  }

  // @ts-ignore
  abstract render(): Node;

  compile(template: string, props: Record<string, any>) {
    this.addChildren();

    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (child instanceof Block) {
        propsAndStubs[key] = `<div data_id="${child._id}"></div>`;
      } else if (child instanceof Array && child.every((item) => item instanceof Block)) {
        const result: string[] = [];
        Object.values(child).forEach((childObject) => {
          result.push(`<div data_id="${childObject._id}"></div>`);
        });
        propsAndStubs[key] = result;
      }
    });

    const fragment: HTMLElement | HTMLTemplateElement = this._createDocumentElement('template');
    const currentTemplate = Handlebars.compile(template);

    fragment.innerHTML = currentTemplate(propsAndStubs);
    if ('content' in fragment) {
      Object.values(this.children).forEach((child) => {
        if (child instanceof Block) {
          const stub = fragment.content.querySelector(`[data_id="${child._id}"]`);
          if (stub) {
            stub.replaceWith(child.getContent());
          } else {
            throw Error(`Ошибка при рендере элемента ${child.getContent()}`);
          }
        } else if (child instanceof Array) {
          Object.values(child).forEach((childObject) => {
            const stub = fragment.content.querySelector(`[data_id="${childObject._id}"]`);
            if (stub) {
              stub.replaceWith(childObject.getContent());
            } else {
              throw Error(`Ошибка при рендере элемента ${childObject.getContent()}`);
            }
          });
        }
      });
      return fragment.content;
    }
    throw Error('Не удалось отрендерить');
  }

  show() {
    this.element.style.display = 'block';
  }

  hide() {
    this.element.style.display = 'none';
  }

  addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
    this.currentEvents = events;
  }

  _removeEvents() {
    if (this.currentEvents) {
      Object.keys(this.currentEvents).forEach((eventName) => {
        this._element.removeEventListener(eventName, this.currentEvents[eventName]);
      });
    }
  }
}
