import Block from '../../core/Block';

export class Page500 extends Block {
  render() {
    return `
      {{{ErrorPage code="500" text="Что-то пошло не так..."}}}
    `;
  }
}