import Block from '../../components/base/block.ts';
import greetings from './error500-template.ts';
import ErrorCard from '../../blocks/error-card/error-card.ts';
import './error500.css';
import render from '../../utils/render.ts';

export interface Error500BlockType {
    errorCard?: ErrorCard
}

class Error500Page extends Block<Error500BlockType> {
  constructor(props: Error500BlockType) {
    props.errorCard = new ErrorCard(
      {
        className: 'h1',
        title: {
          className: 'error500-title',
          text: '500',
          tag: 'div',
        },
        message: {
          className: 'error500-message',
          text: 'уже фиксим',
          tag: 'h1',
        },
        link: {
          className: 'error500-back-chats',
          href: '#',
          text: 'вернуться к чатам',
        },
      },
    );
    super('div', props);
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
export const error500Page = new Error500Page({});

render('#app', error500Page);
