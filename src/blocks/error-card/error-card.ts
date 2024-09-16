import Title, { TitleBlockType } from '../../components/title/title.ts';
import ErrorMessage from '../form/field/error-message/error-message.ts';
import Link, { LinkBlockType } from '../../components/link/link.ts';
import Block from '../../components/base/block.ts';
import greetings from './error-card-template.ts';

export interface Error500BlockType {
    className: string,
    title: TitleBlockType
    message: TitleBlockType
    link: LinkBlockType,
    settings?: { withInternalID: boolean }
}

export default class ErrorCard extends Block<Error500BlockType> {
  declare children: {
      errorTitle: Title,
      errorMessage: ErrorMessage,
      errorLink: Link,
  };

  constructor(props: Error500BlockType) {
    super('div', props);
  }

  addChildren() {
    this.children.errorTitle = new Title(this.props.title);
    this.children.errorMessage = new Title(this.props.message);
    this.children.errorLink = new Link(this.props.link);
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
