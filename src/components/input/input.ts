import Block from '../../core/Block';

interface InputProps {
  onBlur?: () => void;
  onFocus?: () => void;
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  type?: 'text' | 'password' | 'email';
}

export class Input extends Block {
  public static componentName = 'Input';

  constructor(
    {onBlur, onFocus, name, value = '', error = '', label, type = 'text', placeholder}: InputProps
  ) {
    super({name, label, type, value, error, placeholder, events: {blur: onBlur, focus: onFocus}});
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props).events as Record<string, () => void>;
    if (!events) {
      return;
    }
    Object.entries(events).forEach(([event, listener]) => {
      const element = (this.element as HTMLElement).querySelector(`input`);
      if (element !== null) {
        element.addEventListener(event, listener);
      }  
    });
  }

  protected render(): string {
    const { error, value } = this.state;

    return `
      <div class="form-group">
        <label for="{{name}}" class="form-label">{{label}}</label>
        <input 
          type="{{type}}"
          name="{{name}}"
          id = "${this.id}"
          placeholder="{{placeholder}}"
          blur = "{{onBlur}}"
          class="form-input"
          value="${value}"
        >
        {{{Error
          text="${error}"
        }}}
      </div>
    `
  }
}
