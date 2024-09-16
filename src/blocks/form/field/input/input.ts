/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import greetings from './input-template.ts';
import Block from '../../../../components/base/block.ts';

export interface inputBlockType {
    className: string,
    name: string,
    placeholder: string,
    inputType: string,
    settings?: {withInternalID: boolean},
    events?: Record<string, any>
}

export default class Input extends Block<inputBlockType> {
  declare currentEvents: Record<string, any>;

  constructor(props: inputBlockType) {
    super('div', props);
  }

  render() {
    return this.compile(greetings, this.props);
  }

  addEvents() {
    const { events = {} as Record<string, Function> } = this.props;
    Object.keys(events).forEach((eventName) => {
      if (eventName === 'blur') {
        this.element.querySelector('input')?.addEventListener(eventName, events[eventName]);
      } else if (events[eventName]) {
        this.element.addEventListener(eventName, events[eventName]);
      }
    });

    this.currentEvents = events;
  }

  clear() {
    const input = this.element.querySelector('input');
    if (input) {
      input.value = '';
    }
  }

  getInputValue(): string {
    const input = this.element.querySelector('input');
    if (input) {
      return input.value;
    }
    throw Error('Ошибка при получении значения');
  }

  getName(): string {
    return this.props.name;
  }
}
