import Block from '../../../components/base/block.ts';
import greetings from './message-template.ts';

export interface MessageBlockType{
    me: boolean,
    text: string,
    time: string,
    read: boolean,
    settings?: {withInternalID: boolean}
}

export default class Message extends Block<MessageBlockType> {
  constructor(props: MessageBlockType) {
    super('div', props);
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
