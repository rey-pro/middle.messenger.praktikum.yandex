import Block from '../../core/Block';
import './profile.less';
export interface SignInProps {}
interface ProfileFields {
    label: string
    value: string
}

export class Profile extends Block {
    protected getStateFromProps() {
    }

    protected getFieldsData(): Array<ProfileFields> {
        return [
            {label: 'Почта', value: 'alex228@mail.ru'},
            {label: 'Логин', value: 'alex228'},
            {label: 'Имя', value: 'Alex'},
            {label: 'Фамилия', value: 'Petrov'},
            {label: 'Имя в чате', value: 'Alex'},
            {label: 'Телефон', value: '+79999999999'},
            {label: 'Почта', value: 'alex228@mail.ru'},
        ]
    }

    render() {
        // language=hbs
        return `
            <main class="main">
                <div class="profile-navigation" ><a href="/chat.html">
                    <button class="button profile-navigation__button">←</button>
                </a></div>
                <div class="profile-main" >
                    <div class="profile-info" >
                        <div class="profile-info__image" >
                            <div class="profile-info__image-edit"><p class="profile-info__image-edit-text">Поменять аватар</p></div>
                        </div>
                        <h4 class="profile-info__name">Alex </h4>
                        <div class="profile-info__fields-container" >
                            ${
                                this.getFieldsData().map(item => `
                                <div class="profile-info__field">
                                    <p class="profile-info__field-name">${item.label}</p>
                                    <p class="profile-info__field-value">${item.value}</p>
                                </div>
                            `).join('')
                            }
                        </div>
                        <div class="profile-info__fields-container" >
                            <div class="profile-info__field" >
                                <button class="button profile-info__edit-button">Изменить данные
                                </button>
                            </div>
                            <div class="profile-info__field" >
                                <button class="button profile-info__edit-button">Изменить пароль
                                </button>
                            </div>
                            <div class="profile-info__field" >
                                <button class="button profile-info__logout-button" >
                                    Выйти
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        `;
    }
}