import Block from '../base/block.ts';
import greetings from './button_template.ts';

export interface buttonBlockType {
    className: string,
    typeName: string,
    text: string,
    settings?: {withInternalID: boolean},
    events?: {
        click?: (events: MouseEvent) => void,
        keydown?: (event: KeyboardEvent) => void
    },
}

export default class Button extends Block<buttonBlockType> {
  constructor(props: buttonBlockType) {
    // Создаём враппер DOM-элемент button
    super('div', props);
  }

  componentDidMount() {
    this.element.querySelector('button')?.focus();
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
