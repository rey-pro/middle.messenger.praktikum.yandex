import Form from '../../components/form';
import Validator from '../../core/validator';
import { withStore } from '../../utils';
import { create } from '../../services/chat';

import '../../styles/profile.scss';

export class CreateChatPage extends Form {
  public forAuthorized = true;

  validator = {
    title: new Validator({rules: {'required': true}}),
  }

  submitHandler = function(formObject: any){
    window.store.dispatch(create, formObject);
  }; 

  render() {
    return `
    <div class="centered-block__wrapper">
      {{#if store.state.isLoading}}
      <div class="back-column centered">
            {{{Link
              to="/chat"
              class="back-btn"
            }}}    
        </div>
        <div class="centered full-block">
            <div class="full-block__wrapper">
                <form class="form-default form-inline">
                {{#if store.state.formError}}
                <p class="error text-center">{{store.state.formError}}</p>
                {{/if}}                
                {{{Input
                    name="title"
                    label="Создать чат"
                    ref="title"
                    type="text"
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

export default withStore(CreateChatPage);