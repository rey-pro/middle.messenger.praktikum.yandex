import Block from '../../core/Block';

interface InputProps {
    onChange?: () => void;
    onBlur?: () => void;
    onFocus?: () => void;
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    value?: string;
    error?: string;
}

export class InputField extends Block {
    constructor({onChange, onBlur, onFocus, ...props}: InputProps) {
        super({
            ...props,
            events: {
                input: onChange,
                blur: onBlur,
                focus: onFocus
            }
        });

    }

    protected render(): string {
        // language=hbs
        return `
            <input 
                class="{{placeholder}} basic-input" 
                type="{{type}}"
                value="{{value}}"
                name="{{name}}"
            >
        `
    }
}
