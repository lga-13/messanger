/* eslint-disable no-console */
import Block from '../../components/base/block.ts';
import greetings from './chat-page-template.ts';
import Link from '../../components/link/link.ts';
import Plug from '../../components/plug/plug.ts';
import MessageChain from '../../blocks/message_chain/message_chain.ts';
import chat2 from '../../public/static/img/chat2.svg';
import ChatList from '../../blocks/chats_list/chats_list.ts';
import { Validator } from '../../validators/field_validator.ts';
import Form from '../../blocks/form/form.ts';
import './chat-page.css';
import render from '../../utils/render.ts';

export interface IMessage {
  me: boolean;
  text: string;
  time: Date;
  read: boolean;
}

export interface IDialogue {
  index: number;
  sender: string;
  message_chain: IMessage[];
}

export const MOCK_MESSAGE_DATA: IDialogue[] = [
  {
    index: 14658764747,
    sender: 'Мама',
    message_chain: [
      {
        me: true,
        text: 'В лесу растут шишки!',
        time: new Date('2024-03-23T10:30:34'),
        read: true,
      },
      {
        me: true,
        text: 'Крупные?',
        time: new Date('2024-03-23T10:30:36'),
        read: true,
      },
      {
        me: false,
        text: 'Крупные',
        time: new Date('2024-03-24T10:31:38'),
        read: false,
      }],
  },
  {
    index: 2343265678,
    sender: 'Папа',
    message_chain: [
      {
        me: false,
        text: 'Привет!',
        time: new Date('2024-03-23T09:54:12'),
        read: true,
      },
      {
        me: true,
        text: 'Привет! Как ты',
        time: new Date('2024-03-23T09:55:12'),
        read: true,
      },
      {
        me: false,
        text: 'Пойдет! А ты?',
        time: new Date('2024-03-23T09:58:12'),
        read: false,
      },
      {
        me: false,
        text: 'Ау',
        time: new Date('2024-03-23T09:59:12'),
        read: false,
      },
      {
        me: false,
        text: 'Ты тут?',
        time: new Date('2024-03-24T10:00:12'),
        read: false,
      }],
  },
  {
    index: 16565464623,
    sender: 'Коля',
    message_chain: [
      {
        me: true,
        text: 'Здарова! Как дела?',
        time: new Date('2022-01-02T10:30:34'),
        read: true,
      },
    ],
  },
  {
    index: 15655,
    sender: 'Юлия Викторовна',
    message_chain: [
      {
        me: true,
        text: 'Прошу приготовить отчет',
        time: new Date('2024-03-24T15:00:34'),
        read: true,
      },
      {
        me: false,
        text: 'Ок!',
        time: new Date('2024-03-24T16:23:34'),
        read: false,
      },
    ],
  },
  {
    index: 13,
    sender: 'Сосед',
    message_chain: [
      {
        me: true,
        text: 'ЗАйду?',
        time: new Date('2024-03-24T22:30:00'),
        read: true,
      },
      {
        me: false,
        text: 'Жду!',
        time: new Date('2024-03-24T22:35:00'),
        read: true,
      },
    ],
  },
  {
    index: 123,
    sender: 'Денис Парикмахер',
    message_chain: [
      {
        me: false,
        text: 'Когда ждать?',
        time: new Date('2022-01-02T10:30:34'),
        read: true,
      },
    ],
  },
  {
    index: 1233213123131,
    sender: 'Альберт',
    message_chain: [
      {
        me: true,
        text: 'Привет',
        time: new Date('2022-01-02T10:30:34'),
        read: true,
      },
    ],
  },
  {
    index: 132323,
    sender: 'Читстка мебели',
    message_chain: [
      {
        me: false,
        text: 'ВНИМАНИЕ! Скидки для постоянных клиентов!',
        time: new Date('2024-03-20T09:10:34'),
        read: true,
      },
    ],
  },
  {
    index: 1000,
    sender: 'Сестра',
    message_chain: [
      {
        me: false,
        text: 'Привет! Поможешь с программированием?',
        time: new Date('2024-03-23T11:57:34'),
        read: true,
      },
      {
        me: true,
        text: 'Ага!',
        time: new Date('2024-03-23T11:57:34'),
        read: false,
      },
    ],
  },
  {
    index: 121211,
    sender: 'Александр HR',
    message_chain: [
      {
        me: false,
        text: 'Предлагаю созвонитьтся',
        time: new Date('2022-01-02T10:30:34'),
        read: true,
      },
    ],
  },
];

MOCK_MESSAGE_DATA.forEach((chat: IDialogue) => {
  chat.message_chain.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
});

export function getChatsList(): IDialogue[] {
  const sortChats = (chats: IDialogue[]) => chats.sort((a: IDialogue, b: IDialogue) => {
    const lastMessageTimeA = a.message_chain[a.message_chain.length - 1].time;
    const lastMessageTimeB = b.message_chain[b.message_chain.length - 1].time;
    return lastMessageTimeB.getTime() - lastMessageTimeA.getTime();
  });

  return sortChats(MOCK_MESSAGE_DATA);
}

export function getMessageChain(index: number): IMessage[] {
  const result: IMessage[] | undefined = MOCK_MESSAGE_DATA.find((item) => item.index === index)?.message_chain;
  if (!result) {
    throw Error('Ошибка при получении сообщений');
  }
  return result;
}

export function getSender(index: number): string | undefined {
  return MOCK_MESSAGE_DATA.find((item) => item.index === index)?.sender;
}

export function addMessageChain(index: number, message: string, time: Date) {
  const messageItem = MOCK_MESSAGE_DATA.find((item) => item.index === index);
  if (messageItem) {
    messageItem.message_chain.push({
      me: true,
      text: message,
      time,
      read: false,
    });
  } else {
    throw new Error(`Нет элемента с индексом ${index}`);
  }
  MOCK_MESSAGE_DATA.forEach((chat: IDialogue) => {
    chat.message_chain.sort((a: IMessage, b: IMessage) => new Date(a.time).getTime() - new Date(b.time).getTime());
  });
}

export function readMessageChain(index: number) {
  const messageItem = MOCK_MESSAGE_DATA.find((item) => item.index === index);
  if (messageItem) {
    Object.values(messageItem.message_chain).forEach((message) => {
      message.read = true;
    });
  } else {
    throw new Error(`Нет элемента с индексом ${index}`);
  }
}

interface chatPageBlockType{

}

export default class ChatPage extends Block<chatPageBlockType> {
  declare children: {
    searchForm: Form,
    accountLink: Link,
    chatPlug: Plug,
    messageChain: MessageChain,
    chatsList: ChatList,
  };

  constructor(props: chatPageBlockType) {
    super('div', props);
  }

  addChildren() {
    const chatList = new ChatList({
      showMessageChain: (userId: number) => { this.showMessageChain(userId); },
    });

    const messageChain = new MessageChain({
      srcName: chat2,
      sender_name: {
        className: 'message-chain-header-title',
        text: ' ZDAROVA ',
        tag: 'p',
      },
      moreButton: {
        className: 'message-chain-more-button',
        typeName: 'button',
        text: '',
      },
      messageForm: {
        className: 'message-chain-send-field',
        button: {
          className: 'message-chain-send-button',
          typeName: 'button',
          text: '',
          events: {
            click: () => {
              if (messageChain.children.messageChainForm.validate()) {
                const message: Record<string, string> = messageChain.children.messageChainForm.get_data();
                addMessageChain(messageChain.userId, message.message, new Date());
                messageChain.setCurrentMessage(messageChain.userId);
                messageChain.children.messageChainForm.clear();
              }
            },
            keydown: () => {},
          },
        },
        fields: [
          {
            input: {
              className: 'message-chain-message-input',
              name: 'message',
              placeholder: 'Cообщение',
              inputType: 'text',
            },
            validator: Validator.validateMessage,
          },
        ],
      },
      attachmentButton: {
        className: 'message-chain-attachment-button',
        typeName: 'button',
        text: '',
        settings: { withInternalID: true },
        events: { click: () => {} },
      },
      chatListHook: () => { chatList.update(messageChain.userId); },
    });
    this.children.messageChain = messageChain;
    this.children.messageChain.hide();

    const chatPlug = new Plug({
      className: 'chats-plug',
      link: {
        className: 'chats-plug-message',
        href: '#',
        text: 'Выберите чат, чтобы начать общаться.',
      },
    });
    this.children.chatPlug = chatPlug;

    this.children.accountLink = new Link({
      className: 'chats-account',
      href: '/src/pages/settings-page/settings-page.html',
      text: 'Аккаунт',
    });

    const searchForm = new Form(
      {
        className: 'chats-search-box',
        button: {
          className: 'chats-search-btn',
          typeName: 'button',
          text: '',
          events: {
            click: () => {
              if (searchForm.validate()) {
                console.log(searchForm.get_data());
              }
            },
          },
        },
        fields: [{
          input: {
            className: 'chats-search-input',
            name: 'chat_search',
            placeholder: '',
            inputType: 'text',
          },
          validator: Validator.validateSearch,
        }],

      },
    );
    this.children.searchForm = searchForm;

    this.children.chatsList = chatList;
  }

  showMessageChain(userId: number) {
    this.children.messageChain.show();
    this.children.chatPlug.hide();
    this.children.messageChain.setCurrentMessage(userId);
    return true;
  }

  render() {
    return this.compile(greetings, this.props);
  }
}

export const chatPage = new ChatPage({});

render('#app', chatPage);
