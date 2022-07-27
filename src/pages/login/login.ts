import Form from '../../components/form';
import Validator from '../../core/validator';
import { withStore } from '../../utils';
import { login } from '../../services/auth';

export class LoginPage extends Form {
  validator = {
    login: new Validator({rules: {'required': true, 'min': 3, 'max': 20, 'lettersdigits': true}}),
    password: new Validator({rules: {'required': true, 'min': 8, 'max': 40, 'capitalizexist': true, 'digitexist': true}})
  }

  submitHandler = function(formObject: any){
    window.store.dispatch(login, formObject);
  }; 

  componentDidUpdate(oldProps: P, newProps: P): boolean {
    const store: any = this.state.store;

    if ( store.isLoading && store.user ) {
      window.router.go('/chat');
      return false;
    }

    return true;
  }

  render() {
    return `
    <div class="centered-block__wrapper">
      {{#if store.state.isLoading}}
      <div class="centered-block__content block-shadow">
        <form class="form-default">
          <h1>Вход</h1>
          {{#if store.state.formError}}
          <p class="error">{{store.state.formError}}</p>
          {{/if}}
          {{#if store.state.formSuccess}}
          <p class="error">{{store.state.formSuccess}}</p>
          {{/if}}
          {{{Input
            name="login"
            label="Логин"
            ref="login"
            id="login"
            type="text"
            onBlur=onBlur
            onFocus=onFocus
          }}}
          {{{Input
            name="password"
            label="Пароль"
            ref="password"
            id="password" 
            type="password"
            onBlur=onBlur
            onFocus=onFocus
          }}}

          {{{Button
            text="Авторизоваться"
            onClick=onSubmit
          }}}
          {{{Link
            to="/register"
            text="Нет аккаунта?"
          }}}
        </form>
      </div>
      {{else}}
      <div>loading...</div>
      {{/if}}  
    </div>     
    `;
  }
}

export default withStore(LoginPage);