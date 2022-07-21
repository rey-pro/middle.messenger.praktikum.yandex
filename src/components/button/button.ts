import Block from '../../core/Block';

interface ButtonProps {
  id?: number;
  text: string;
  buttonClass?: string;
  onClick?: () => void;
}

export class Button extends Block {
  public static componentName = 'Button';

  constructor({id, text, buttonClass = "accent-btn", onClick}: ButtonProps) {
    super({id, text, buttonClass, events: {click: onClick}});
  }

  protected render(): string {
    return `
      <div class="button">
        <button class="{{buttonClass}}" type="button" {{#if id}}data-id="{{id}}"{{/if}}>{{text}}</button>
      </div>
    `;
  }
}
