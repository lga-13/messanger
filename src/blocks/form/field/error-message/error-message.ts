import greetings from './error-message-template.ts';
import Block from '../../../../components/base/block.ts';

export interface ErrorMessageBlockType {
    className: string,
    text: string,
    settings?: {withInternalID: boolean}
}

export default class ErrorMessage extends Block<ErrorMessageBlockType> {
  constructor(props: ErrorMessageBlockType) {
    super('div', props);
  }

  render() {
    this.hide();
    return this.compile(greetings, this.props);
  }
}
