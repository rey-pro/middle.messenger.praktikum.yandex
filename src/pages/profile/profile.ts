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
            {label: 'Email', value: 'alex228@mail.ru'},
            {label: 'Login', value: 'alex228'},
            {label: 'First Name', value: 'Alex'},
            {label: 'Second Name', value: 'Petrov'},
            {label: 'Nickname for chat', value: 'Alex'},
            {label: 'Phone', value: '+79999999999'},
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
                            <div class="profile-info__image-edit"><p class="profile-info__image-edit-text">Change avatar</p></div>
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
                                <button class="button profile-info__edit-button">Edit
                                </button>
                            </div>
                            <div class="profile-info__field" >
                                <button class="button profile-info__edit-button">Change password
                                </button>
                            </div>
                            <div class="profile-info__field" >
                                <button class="button profile-info__logout-button" >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        `;
    }
}