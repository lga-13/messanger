import Block from '../base/block.ts';
import greetings from './title-template.ts';

export interface TitleBlockType {
    className: string,
    text: string,
    tag: string,
    settings?: {withInternalID: boolean},
}

export default class Title extends Block<TitleBlockType> {
  declare props: TitleBlockType;

  constructor(props: TitleBlockType) {
    // Создаём враппер DOM-элемент button
    super('div', props);
  }

  setText(text: string) {
    this.props.text = text;
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
