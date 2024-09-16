/* eslint-disable @typescript-eslint/no-explicit-any */
import greetings from './message_chain-template.ts';
import Button, { buttonBlockType } from '../../components/button/button.ts';
import Title, { TitleBlockType } from '../../components/title/title.ts';
import Block from '../../components/base/block.ts';
import Message from './message/message.ts';
import { getMessageChain, getSender, IMessage } from '../../pages/chat-page/chat-page.ts';
import Form, { FormProps } from '../form/form.ts';
import MessageContainer from './message_container/message_container.ts';
import TimeConverter from '../../modules/time_prepare/converter.ts';
import DateComparator from '../../modules/time_prepare/dateComparator.ts';

export interface MessageChainBlockType {

    srcName: any
    sender_name: TitleBlockType,
    messageForm: FormProps,
    attachmentButton: buttonBlockType,
    moreButton: buttonBlockType
    settings?: {withInternalID: boolean}
    chatListHook: () => void,
}

export default class MessageChain extends Block<MessageChainBlockType> {
  declare children: {
      messageChainMoreButton: Button,
      chainMessages : MessageContainer[],
      messageChainAttachmentsButton : Button,
      messageChainForm : Form,
      messageSenderName: Title,

  };

  declare props: MessageChainBlockType;

  userId: number;

  constructor(props: MessageChainBlockType) {
    props.settings = { withInternalID: true };
    super('div', props);
  }

  setCurrentMessage(userId: number) {
    // Уставнавливается id для текущего чейна
    this.userId = userId;

    // Делаем запрос пользователя
    const sender: string | undefined = getSender(this.userId);

    // Задаем новый заголовок чейна
    if (sender) {
      this.children.messageSenderName.setText(sender);
    } else {
      throw new Error('Не найден пользователь');
    }

    const messagesList: IMessage[] = getMessageChain(this.userId);
    const messages: MessageContainer[] = [];
    let currentData: null | Date = null;
    Object.values(messagesList).forEach((message: IMessage) => {
      let dataTitle = null;
      if (!(currentData instanceof Date) || !DateComparator.inOneDay(currentData, message.time)
      ) {
        currentData = message.time;
        dataTitle = new Title(
          {
            className: 'message-chain-data-title',
            text: new TimeConverter(message.time).toChainTitles(),
            tag: 'h5',
          },

        );
      }
      const currentMessage = new MessageContainer({
        messageData: dataTitle,
        message: new Message(
          {
            me: message.me,
            text: message.text,
            time: new TimeConverter(message.time).toChain(),
            read: message.read,
          },
        ),
      });
      messages.push(currentMessage);
    });

    // Присваивание this.children.messages
    this.children.chainMessages = messages;

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    this.props.chatListHook();
  }

  addChildren() {
    this.children.messageChainMoreButton = new Button(this.props.moreButton);
    this.children.messageSenderName = new Title(this.props.sender_name);
    this.children.messageChainAttachmentsButton = new Button(this.props.attachmentButton);
    this.children.messageChainForm = new Form(this.props.messageForm);
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
