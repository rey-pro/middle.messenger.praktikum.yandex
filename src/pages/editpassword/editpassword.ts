import Form from '../../components/form';
import Validator from '../../core/validator';
import { withStore } from '../../utils';
import { changePassword } from '../../services/user';

import '../../styles/profile.scss';

export class EditPasswordPage extends Form {
  public forAuthorized = true;

  validator = {
    oldPassword: new Validator({rules: {'required': true, 'min': 8, 'max': 40, 'capitalizexist': true, 'digitexist': true}}),
    newPassword: new Validator({rules: {'required': true, 'min': 8, 'max': 40, 'capitalizexist': true, 'digitexist': true}})
  }

  submitHandler = function(formObject: any){
    window.store.dispatch(changePassword, formObject);
  }; 

  render() {
    return `
    <div class="centered-block__wrapper">
      {{#if store.state.isLoading}}
      <div class="back-column centered">
            {{{Link
              to="/profile"
              class="back-btn"
            }}}    
        </div>
        <div class="centered full-block">
            <div class="full-block__wrapper">
                <div class="avatar-block">
                    <img class="avatar-img" src="{{store.state.user.avatar}}">
                </div>
                <form class="form-default form-inline">
                {{#if store.state.formError}}
                <p class="error text-center">{{store.state.formError}}</p>
                {{/if}}                
                {{{Input
                    name="oldPassword"
                    label="Старый пароль"
                    ref="oldPassword"
                    type="password"
                    onBlur=onBlur
                    onFocus=onFocus
                }}}
                {{{Input
                    name="newPassword"
                    label="Новый пароль"
                    ref="newPassword"
                    type="password"
                    onBlur=onBlur
                    onFocus=onFocus
                }}}
                {{{Button
                    text="Сохранить"
                    onClick=onSubmit
                }}}          
                </form>
            </div>    
        </div>
        {{else}}
        <div>loading...</div>
        {{/if}}          
    </div>
    `;
  }
}

export default withStore(EditPasswordPage);