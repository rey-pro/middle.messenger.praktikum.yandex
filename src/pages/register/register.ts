import Form from '../../components/form';
import Validator from '../../core/validator';
import { withStore } from '../../utils';
import { create } from '../../services/user';

export class RegisterPage extends Form {
  validator = {
    login: new Validator({rules: {'required': true, 'min': 3, 'max': 20, 'lettersdigits': true}}),
    password: new Validator({rules: {'required': true, 'min': 8, 'max': 40, 'capitalizexist': true, 'digitexist': true}}),
    email: new Validator({rules: {'required': true, 'email': true}}),
    first_name: new Validator({rules: {'required': true, 'cirillic': true, 'capitalizfirst': true}}),
    second_name: new Validator({rules: {'required': true, 'cirillic': true, 'capitalizfirst': true}}),
    phone: new Validator({rules: {'phone': true}}),
  }

  submitHandler = function(formObject: any){
    window.store.dispatch(create, formObject);
  }; 

  render() {
    return `
    <div class="centered-block__wrapper">
      {{#if store.state.isLoading}}
      <div class="centered-block__content block-shadow">
        <form class="form-default">
          <h1>Регистрация</h1>
          {{#if store.state.formError}}
          <p class="error">{{store.state.formError}}</p>
          {{/if}}
          {{{Input
            name="email"
            label="Почта"
            ref="email"
            type="text"
            onBlur=onBlur
            onFocus=onFocus
          }}}
          {{{Input
            name="login"
            label="Логин"
            ref="login"
            type="text"
            onBlur=onBlur
            onFocus=onFocus
          }}}
          {{{Input
            name="first_name"
            label="Имя"
            ref="first_name"
            type="text"
            onBlur=onBlur
            onFocus=onFocus
          }}}
          {{{Input
            name="second_name"
            label="Фамилия"
            ref="second_name"
            type="text"
            onBlur=onBlur
            onFocus=onFocus
          }}} 
          {{{Input
            name="phone"
            label="Телефон"
            ref="phone"
            type="text"
            onBlur=onBlur
            onFocus=onFocus
          }}}          
          {{{Input
            name="password"
            label="Пароль"
            ref="password"
            type="password"
            onBlur=onBlur
            onFocus=onFocus
          }}}
          {{{Input
            name="confirm_password"
            label="Пароль (еще раз)"
            ref="confirm_password"
            type="password"
            onBlur=onBlur
            onFocus=onFocus
          }}}
          {{{Button
            text="Зарегистрироваться"
            onClick=onSubmit
          }}}
          {{{Link
            to="/login"
            text="Войти"
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

export default withStore(RegisterPage);
