import Form from '../../components/form';
import Validator from '../../core/validator';
import { withStore } from '../../utils';
import { addUser, deleteUser } from '../../services/chat';

import '../../styles/profile.scss';

export class EditchatPage extends Form {
  public forAuthorized = true;

  validator = {
    login: new Validator({rules: {'required': true}}),
  }

  submitHandler = function(formObject: any){
    window.store.dispatch(addUser, formObject);
  }; 

  componentDidUpdate(oldProps: P, newProps: P): boolean {
    super.componentDidUpdate(oldProps, newProps);
    
    const store: any = this.state.store;

    if ( store.isLoading && !store.currentChat ) {
      window.router.go('/chat');
      return false;
    }

    return true;
  }

  protected getStateFromProps(props?: any) {
    super.getStateFromProps(props);
    
    const extState = {
      onClick: (e: InputEvent) => {
        const element: HTMLElement | null = e.target as HTMLElement; 

        if (element === null) {
          return;
        }

        window.store.dispatch(deleteUser, element.dataset.id);
      },
    }

    this.setState(extState);
  }


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
                <div class="avatar-block">
                    <img class="avatar-img" src="{{store.state.currentChat.avatar}}">
                </div>
                <p class="text-center">{{store.state.currentChat.name}}</p>
                <div class="user-info">
                {{#each store.state.currentChat.users}}
                    <div class="user-info__block">
                        <dt class="user-info__label">{{displayName}}</dt>
                        <dd class="user-info__data">
                        {{#unless you}}
                        {{{Button 
                          id=id
                          text="Удалить из чата"
                          onClick=@root.onClick
                        }}}
                        {{/unless}}
                        </dd>
                    </div>    
                {{/each}}     
                </div>           
                <form class="form-default form-inline">
                {{#if store.state.formError}}
                <p class="error text-center">{{store.state.formError}}</p>
                {{/if}}  
                <h2>Добавить участника</h2>              
                {{{Input
                    name="login"
                    label="Логин"
                    ref="login"
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

export default withStore(EditchatPage);