import Block from '../../core/Block';

export class Error extends Block {
  public static componentName = 'Error';

  constructor({text=""}) {
    super({text});
  }

  protected render(): string {
    const { text } = this.state;

    return `
        <div class="form-error">${text}</div>
    `
  }
}
