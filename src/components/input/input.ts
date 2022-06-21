import Block from '../../core/Block';
import {Validator} from "../../core/Validator";

interface InputProps {
    onBlur?: () => void;
    onFocus?: () => void;
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    value?: string;
    error?: string;
}

export class Input extends Block {
    constructor({placeholder, error, value, ...props}: InputProps) {
        super({
            placeholder, error, value, ...props,
            onBlur: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                this.refs.error.setProps({text: (new Validator()).validateField(input.name, input.value)})
            },
            onFocus: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                this.refs.error.setProps({text: (new Validator()).validateField(input.name, input.value)})
            },
        });
    }

    protected render(): string {
        // language=hbs
        return `
            <label class="basic-label">{{placeholder}}
                {{{InputField ref="input" name=name type=type value=value placeholder=placeholder onFocus=onFocus onBlur=onBlur}}}
                {{{InputError ref="error" text=error }}}
            </label>
        `
    }
}
