import Block from '../../core/Block';
import './sign-up.less';
import {Validator} from "../../core/Validator";
interface SignUpFields {
    field: string,
    placeholder: string,
    type: string,
}

export class SignUp extends Block {
    protected fields(): Array<SignUpFields> {
        return [
            {field: 'email', placeholder: 'Email', type: 'text'},
            {field: 'login', placeholder: 'Login', type: 'text'},
            {field: 'first_name', placeholder: 'First name', type: 'text'},
            {field: 'second_name', placeholder: 'Second name', type: 'text'},
            {field: 'phone', placeholder: 'Phone', type: 'text'},
            {field: 'password', placeholder: 'Password', type: 'password'},
            {field: 'repeat_password', placeholder: 'Repeat password', type: 'password'},
        ]
    }
    protected validateForm() {
        let loginData: any = {};
        this.fields().forEach((item: SignUpFields) => {
            loginData[item.field] = (this.refs[item.field].refs.input.element as HTMLInputElement).value;
        });

        let nextState: any = {
            errors: {},
            values: {...loginData},
        };
        this.fields().forEach((item: SignUpFields) => {
            nextState.errors[item.field] = (new Validator).validateField(item.field, loginData[item.field]);
        });

        if(nextState.values.repeat_password && nextState.values.repeat_password !== nextState.values.password) {
            nextState.errors.repeat_password = 'Passwords do not match';
        }

        this.setState(nextState);

    }
    protected getStateFromProps() {
        this.state = {
            values: {},
            errors: {},
            onLogin: () => {
                this.validateForm();

                console.log('action/sign-up', this.state.values);
            }
        }
        this.fields().forEach((item: SignUpFields) => {
            this.state.values[item.field] = '';
            this.state.errors[item.field] = '';
        });
    }

    render() {
        const {errors, values} = this.state;
        const fields = this.fields();
        // language=hbs
        return `
            <div class="sign-in-page">
                <main class="sign-in-block">
                    <h1 class="sign-in-header basic-header">Sign Up</h1>
                    <form class="sign-in-form" action="" id="form-root">
                        <div class="sign-in-fields">
                            ${fields.map(item => `
                                {{{Input
                                    value="${values[item.field]}"
                                    error="${errors[item.field]}"

                                    type="${item.type}"
                                    name="${item.field}"
                                    ref="${item.field}"
                                    placeholder="${item.placeholder}"
                                }}}
                                `).join('')
                            }
                        </div>
                        {{{Button
                            type="button"
                            name="Sign Up"
                            onClick=onLogin
                        }}}
                    </form>
                </main>
            </div>
        `;
    }
}