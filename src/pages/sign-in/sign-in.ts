import Block from '../../core/Block';
import './sign-in.less';
import {Validator} from "../../core/Validator";
export interface SignInProps {}

export class SignIn extends Block {
    protected validateForm() {
        const loginData = {
            login: (this.refs.login.refs.input.element as HTMLInputElement).value,
            password: (this.refs.password.refs.input.element as HTMLInputElement).value
        };

        const nextState = {
            errors: {
                login: (new Validator).validateField('login', loginData.login),
                password: (new Validator).validateField('password', loginData.password),
            },
            values: {...loginData},
        };

        this.setState(nextState);

    }
    protected getStateFromProps() {
        this.state = {
            values: {
                login: '',
                password: '',
            },
            errors: {
                login: '',
                password: '',
            },
            onLogin: () => {
                this.validateForm();

                console.log('action/login', this.state.values);
            }
        }
    }

    render() {
        const {errors, values} = this.state;
        // language=hbs
        return `
            <div class="log-in-page">
                <main class="log-in-block">
                    <h1 class="log-in-header basic-header">Sing in</h1>
                    <form class="log-in-form" action="" id="form-root">
                        <div class="log-in-fields">
                            {{{Input
                                value="${values.login}"
                                error="${errors.login}"

                                type="text"
                                name="login"
                                ref="login"
                                placeholder="login"
                            }}}
                            {{{Input
                                value="${values.password}"
                                error="${errors.password}"

                                type="text"
                                name="password"
                                ref="password"
                                placeholder="password"
                            }}}
                        </div>
                        {{{Button
                            type="button"
                            name="Sign in"
                            onClick=onLogin
                        }}}
                    </form>
                    <a href="/sign-up.html" class="log-in-no-account-link basic-link">Don't have an account?</a>
                </main>
            </div>
        `;
    }
}