import greetings from './field_template.ts';
import Label, { labelBlockType } from './label/label.ts';
import Input, { inputBlockType } from './input/input.ts';
import ErrorMessage, { ErrorMessageBlockType } from './error-message/error-message.ts';
import Block from '../../../components/base/block.ts';
import Link, { LinkBlockType } from '../../../components/link/link.ts';
import Button from '../../../components/button/button.ts';

export interface fieldBlockType {

    // ДАНЫНЕ ЭЛЕМЕНТОВ
    label?: labelBlockType
    input: inputBlockType
    errorMessage?: ErrorMessageBlockType
    link?: LinkBlockType
    validator: (value: string) => boolean
    settings?: { withInternalID: boolean };
}

export default class Field extends Block<fieldBlockType> {
  declare children: {
    fieldLabel: Label | null;
    fieldInput: Input;
    fieldErrorMessage: ErrorMessage | null;
    fieldLink: Link | null;
    fieldToggleButton: Button;
  };

  constructor(props: fieldBlockType) {
    props.settings = { withInternalID: true };
    super('div', props);
  }

  addChildren() {
    let fieldLabel = null;
    if (this.props.label) {
      fieldLabel = new Label(this.props.label);
    }
    this.children.fieldLabel = fieldLabel;

    let fieldErrorMessage: ErrorMessage | null = null;
    if (this.props.errorMessage) {
      fieldErrorMessage = new ErrorMessage(this.props.errorMessage);
    }
    this.children.fieldErrorMessage = fieldErrorMessage;

    this.props.input.events = {
      click: () => {
        if (fieldErrorMessage) {
          fieldErrorMessage.hide();
        }
      },
      blur: () => {
        if (!this.validate()) {
          if (fieldErrorMessage) {
            fieldErrorMessage.show();
          }
        }
      },
    };
    this.children.fieldInput = new Input(this.props.input);

    // Ссылка
    let fieldLink = null;
    if (this.props.link) {
      fieldLink = new Link(this.props.link);
    }
    this.children.fieldLink = fieldLink;

    if (this.props.input.inputType === 'password') {
      this.children.fieldToggleButton = new Button({
        className: 'form-toggle',
        typeName: 'button',
        text: '👁',
        settings: { withInternalID: true },
        events: {
          click: () => { this.togglePasswordVisibility(); },
        },
      });
    }
  }

  private inputValue() {
    return this.children.fieldInput.getInputValue();
  }

  showErrorMessage() {
    if (this.children.fieldErrorMessage) {
      this.children.fieldErrorMessage.show();
    }
  }

  validate(): boolean {
    return this.props.validator(this.inputValue());
  }

  clear() {
    this.children.fieldInput.clear();
  }

  getInputValue() {
    return this.inputValue();
  }

  getName() {
    return this.children.fieldInput.getName();
  }

  // Смена пароля
  togglePasswordVisibility() {
    const passwordInput = this.element.querySelector('input');
    if (passwordInput) {
      const currentType = passwordInput.getAttribute('type');
      const newType = currentType === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', newType);
    }
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
