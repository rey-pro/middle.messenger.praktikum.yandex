import Block from '../../core/Block';
import './sign-in.less';
import {Validator} from "../../core/Validator";

export class SignIn extends Block {
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
                const loginData = {
                    login: (this.refs.login.firstElementChild as HTMLInputElement).value,
                    password: (this.refs.password.firstElementChild as HTMLInputElement).value
                };

                const [formIsValid, errorData] = (new Validator).check(loginData)
                const nextState = {
                    errors: {...errorData},
                    values: {...loginData},
                };

                this.setState(nextState);

                if(formIsValid) {
                    console.log('action/login', loginData);
                }
            }
        }
    }

    render() {
        const {errors, values} = this.state;
        // language=hbs
        return `
            <div class="log-in-page">
                <main class="log-in-block">
                    <h1 class="log-in-header basic-header">Вход</h1>
                    <form class="log-in-form" action="" id="form-root">
                        <div class="log-in-fields">
                            {{{Input
                                value="${values.login}"
                                error="${errors.login}"
                                ref="login"
                                id="login"
                                type="text"
                                placeholder="Login"
                            }}}
                            {{{Input
                                value="${values.password}"
                                error="${errors.password}"
                                ref="password"
                                id="password"
                                type="password"
                                placeholder="password"
                            }}}
                        </div>
                        {{{Button
                            type="button"
                            name="Авторизоваться"
                            onClick=onLogin
                        }}}
                    </form>
                    <a href="/sign-up.html" class="log-in-no-account-link basic-link">Нет аккаунта?</a>
                </main>
            </div>
        `;
    }
}