import Page from '../../core/Page';

export class Page404 extends Page {
  public static componentName = 'Page404';

  render() {
    return `
      {{{ErrorPage code="404" text="Не туда попали"}}}
    `;
  }
}
