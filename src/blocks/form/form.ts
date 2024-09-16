/* eslint-disable @typescript-eslint/no-explicit-any */
import Field, { fieldBlockType } from './field/field.ts';
import greetings from './form-template.ts';
import Link, { LinkBlockType } from '../../components/link/link.ts';
import Button, { buttonBlockType } from '../../components/button/button.ts';
import Title, { TitleBlockType } from '../../components/title/title.ts';
import Block from '../../components/base/block.ts';

export interface FormProps {
    className: string,
    title?: TitleBlockType,
    button: buttonBlockType,
    link?: LinkBlockType
    fields: fieldBlockType[],
    settings?: {withInternalID: boolean}

}

export default class Form extends Block<FormProps> {
  declare children: {
    formTitle: Title | null,
    formFields: Field[],
    formButton: Button,
    formLink: Link | null,
  };

  declare props: FormProps;

  constructor(props: FormProps) {
    props.settings = { withInternalID: true };

    super('div', props);
  }

  addChildren() {
    let formTitle = null;
    if (this.props.title) {
      formTitle = new Title(this.props.title);
    }
    this.children.formTitle = formTitle;

    // Поля формы
    const formFields: Field[] = [];
    Object.values(this.props.fields).forEach((field: fieldBlockType) => {
      const currentField = new Field(field);
      formFields.push(currentField);
    });
    this.children.formFields = formFields;

    // Кнопка
    this.children.formButton = new Button(this.props.button);

    // Ссылка формы
    let formLink = null;
    if (this.props.link) {
      formLink = new Link(this.props.link);
    }
    this.children.formLink = formLink;
  }

  // Очистка полей формы
  clear(): void {
    // Ищем поля формы
    Object.values(this.children).forEach((child) => {
      // Проверяем на поля
      if (child instanceof Array && child.every((item) => item instanceof Field)) {
        Object.values(child).forEach((field) => {
          field.clear();
        });
      }
    });
  }

  // Валидация полей формы
  validate(): boolean {
    let verdict = true;
    Object.values(this.children).forEach((child) => {
      if (child instanceof Array && child.every((item) => item instanceof Field)) {
        Object.values(child).forEach((field) => {
          if (!field.validate()) {
            field.showErrorMessage();
            verdict = false;
          }
        });
      }
    });
    return verdict;
  }

  // Метод возвращает даныне всех полей
  get_data(): Record<string, string> {
    const currentCondition: { [key: string]: any } = {};

    Object.values(this.children).forEach((child) => {
      if (child instanceof Array && child.every((item) => item instanceof Field)) {
        Object.values(child).forEach((field: Field) => {
          currentCondition[field.getName()] = field.getInputValue();
        });
      }
    });

    return currentCondition;
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
