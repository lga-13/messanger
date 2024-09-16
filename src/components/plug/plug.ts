import Block from '../base/block.ts';
import greetings from './plug-template.ts';
import Link from '../link/link.ts';

interface PlugBlockType{
    className: string,
    link: {
        className:string,
        href: string,
        text: string
    },
    settings?: { withInternalID: true }
}

export default class Plug extends Block<PlugBlockType> {
  declare children: {
      plugLink: Link
  };

  declare props: PlugBlockType;

  constructor(
    props: PlugBlockType,
  ) {
    props.settings = { withInternalID: true };
    super('div', props);
  }

  addChildren() {
    this.children.plugLink = new Link({
      className: this.props.link.className,
      href: this.props.link.href,
      text: this.props.link.text,

    });
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
