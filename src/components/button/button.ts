import Block from '../../core/Block';

interface ButtonProps {
  name: string;
  type: string;
  onClick: () => void;
}

export class Button extends Block {
  constructor({name, type, onClick}: ButtonProps) {
    super({name, type, events: {click: onClick}});
  }

  protected render(): string {
    // language=hbs
    return `
      <div>
        <button class="log-in-button basic-button" type="{{type}}">{{name}}</button>
      </div>
    `;
  }
}
