import Form from '../../components/form';
import Validator from '../../core/validator';
import { withStore } from '../../utils';
import { getChats, chat, sendMessage, stopMessage } from '../../services/chat';

import '../../styles/profile.scss';
import '../../styles/chat.scss';

export class ChatPage extends Form {
  public forAuthorized = true;

  validator = {
    message: new Validator({rules: {'required': true}})
  }

  constructor(props: P) {
    super(props);
    window.store.dispatch(getChats);
  }
  
  submitHandler = function(formObject: any){
    sendMessage(formObject);
  }; 

  protected getStateFromProps(props?: any) {
    super.getStateFromProps(props);
    
    const extState = {
      onClick: (e: InputEvent) => {
        const element: HTMLElement | null = (e.target as HTMLElement).closest('[id]'); 

        if (element === null) {
          return;
        }

        window.store.dispatch(chat, element.dataset.id);
      },
    }

    this.setState(extState);
  }

  hide() {
    super.hide();
    stopMessage();
  }

  render() {
    return `
    <div class="centered-block__wrapper">
      {{#if store.state.isLoading}}
        <div class="back-column">
          <div class="user-block">
            <div class="chat-block__image"><img src="{{store.state.user.avatar}}"></div>
            {{{Link
                to="/profile"
                text="Профиль"
            }}}
          </div>
          <div class="chat-block__action">
          {{{Link
            to="/chat/add"
            text="Новый чат"
            class="accent-btn"
          }}}
          </div>
          {{#each store.state.chats}}
            {{{Chat
                id = id
                ref=ref
                name=name
                forRead=forRead
                active=active
                lastMessage=lastMessage
                onClick=@root.onClick
            }}}
          {{/each}}  
        </div>
        {{#if store.state.currentChat}}
          <div class="full-block stretched">
            <div class="user-block">
                <div class="chat-block__image"><img src="{{store.state.currentChat.avatar}}"></div>
                <div class="chat-header">
                  <p class="user-name">{{store.state.currentChat.name}}</p>
                  <p class="note">
                  {{#each store.state.currentChat.users}}
                    {{displayName}}
                   {{/each}}
                  </p>
                </div>  
                {{{Link
                  to="/chat/edit"
                  text="Изменить"
                }}}
              </div>
            <div class="message-block__wrapper">
            {{#each store.state.messages}}
            <div class="message-block {{#if you}}my-message{{/if}} {{#unless isRead}}new-message{{/unless}}">
              <p class="message-block__author">{{author.displayName}}</p>
              <p class="message-block__content">{{text}}</p>
              <p class="message-block__time">{{created}}</p>    
            </div>
            {{/each}}
            </div>  
            <div class="form-block">      
                <form class="form-chats">
                {{{Input
                    name="message"
                    ref="message"
                    placeholder="Сообщение" 
                    type="text"
                    onBlur=onBlur
                    onFocus=onFocus
                }}}
                {{{Button
                    buttonClass="back-btn" 
                    text=""
                    onClick=onSubmit
                }}}          
                </form>
            </div>
          </div>        
          {{else}}
          <div class="centered full-block">
            <p class="text-center note">Выберите чат</p>
          </div>
          {{/if}}
      {{else}}
      <div>loading...</div>
      {{/if}}
    </div>
    `;
  }
}

export default withStore(ChatPage);