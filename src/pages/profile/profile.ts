import Block from '../../core/Block';
import { withStore } from '../../utils';
import { logout } from '../../services/auth';
import '../../styles/profile.scss';

export class ProfilePage extends Block {
    public forAuthorized = true;

    constructor(props: P) {
    super({
        ...props,
        links: [
            {
                href: "/profile/edit",
                text: "Изменить данные"     
            },
            {    
                href: "/profile/editpassword",
                text: "Изменить пароль"     
            }    
        ],
        onLogout: () => window.store.dispatch(logout)
     });
  }
    
  render() {
    return `
    <div class="centered-block__wrapper">
        {{#if store.isLoading}}
        <div class="back-column centered">
            {{{Link
                to="/chat"
                class="back-btn"
            }}}
        </div>
        <div class="centered full-block">
            <div class="full-block__wrapper">
                <div class="avatar-block">
                    <img class="avatar-img" src="{{store.user.avatar}}">
                    {{{Link
                        to="/profile/editavatar"
                        class="avatar-block__link"
                        text="Поменять аватар"
                    }}}
                </div>
                <h2>{{store.user.firstName}}</h2>
                <div class="user-info">
                    <div class="user-info__block">
                        <dt class="user-info__label">Почта</dt>
                        <dd class="user-info__data">{{store.user.email}}</dd>
                    </div>    
                    <div class="user-info__block">
                        <dt class="user-info__label">Логин</dt>
                        <dd class="user-info__data">{{store.user.login}}</dd>
                    </div>    
                    <div class="user-info__block">
                        <dt class="user-info__label">Имя</dt>
                        <dd class="user-info__data">{{store.user.firstName}}</dd>
                    </div>    
                    <div class="user-info__block">
                        <dt class="user-info__label">Фамилия</dt>
                        <dd class="user-info__data">{{store.user.lastName}}</dd>
                    </div>    
                    <div class="user-info__block">
                        <dt class="user-info__label">Имя в чате</dt>
                        <dd class="user-info__data">{{store.user.displayName}}</dd>
                    </div>    
                    <div class="user-info__block">
                        <dt class="user-info__label">Телефон</dt>
                        <dd class="user-info__data">{{store.user.phone}}</dd>
                    </div>    
                </div>
                {{#each links}}  
                {{{Link
                    text=this.text
                    to=href
                }}}
                {{/each}}
                {{{Button 
                    text="Выйти"
                    buttonClass="link-btn"
                    onClick=onLogout
                }}}
            </div>    
        </div>
        {{else}}
        <div>loading...</div>
        {{/if}}
    </div>
    `;
  }
}

export default withStore(ProfilePage);
