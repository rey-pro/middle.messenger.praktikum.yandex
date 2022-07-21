import Form from '../../components/form';
import Validator from '../../core/validator';
import { withStore } from '../../utils';
import { changeAvatar } from '../../services/user';

import '../../styles/profile.scss';

export class EditavatarPage extends Form {
  public forAuthorized = true;

  validator = {
    avatar: new Validator({rules: {'required': true}}),
  }

  submitHandler = function(formObject: any){
    window.store.dispatch(changeAvatar, formObject);
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
                    name="avatar"
                    label="Выберите изображение"
                    ref="avatar"
                    type="file"
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

export default withStore(EditavatarPage);