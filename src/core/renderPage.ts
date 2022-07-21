import Block from './Block';

export default function renderPage(BlockPage: Block) {
  const root = document.querySelector('#app');

  root!.appendChild(BlockPage.getContent() as HTMLElement);
}
