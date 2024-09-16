import Block from '../base/block.ts';
import greetings from './link-template.ts';

export interface LinkBlockType {
    className: string,
    href: string,
    text: string,
    settings?: {withInternalID: boolean},
    events?: {
        click: () => void
    }
}

export default class Link extends Block<LinkBlockType> {
  constructor(props: LinkBlockType) {
    super('div', props);
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
