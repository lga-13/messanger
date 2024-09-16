import greetings from './label-template.ts';
import Block from '../../../../components/base/block.ts';

export interface labelBlockType {
    className: string,
    text: string,
    settings?: {withInternalID: boolean}
}

export default class Label extends Block<labelBlockType> {
  constructor(props: labelBlockType) {
    super('div', props);
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
