import Block from '../../components/base/block.ts';
import ErrorCard from '../../blocks/error-card/error-card.ts';
import greetings from '../error500/error500-template.ts';
import './error404.css';
import render from '../../utils/render.ts';

export interface Error404BlockType {
    errorCard?: ErrorCard
}

class Error404Page extends Block<Error404BlockType> {
  constructor(props: Error404BlockType) {
    props.errorCard = new ErrorCard(
      {
        className: 'h1',
        title: {
          className: 'error404-title',
          text: '404',
          tag: 'div',
        },
        message: {
          className: 'error404-message',
          text: 'Еще не создали...',
          tag: 'h1',
        },
        link: {
          className: 'error404-back-chats',
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
export const error404Page = new Error404Page({});

render('#app', error404Page);
