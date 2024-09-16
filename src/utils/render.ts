import Block from '../components/base/block.ts';

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  root?.appendChild(block.getContent());
  return root;
}

export default render;
