import Page from '../../core/Page';

export class Page500 extends Page {
  render() {
    return `
      {{{ErrorPage code="500" text="Что-то пошло не так..."}}}
    `;
  }
}