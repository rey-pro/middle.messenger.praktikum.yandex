import Block from '../../core/Block';

interface InputProps {
  onChange?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value?: string;
  error?: string;
}

export class Input extends Block {
  constructor({onChange, type = 'text', error, placeholder, value}: InputProps) {
    super({type, placeholder, value, error, events: {input: onChange}});
  }

  protected render(): string {
    // language=hbs
    return `
      <label class="basic-label">{{placeholder}}
        <input class="{{placeholder}} basic-input" type="{{type}}" value="{{value}}">
        <div class="input-err {{placeholder}}-err {{#if error}} show {{/if}}">{{#if error}}{{error}}{{/if}}</div>
      </label>
    `
  }
}
