export default `
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
                {{#each fields}}
                    <div class="profile-info__field">
                        <p class="profile-info__field-name">{{ this.name }}</p>
                        <p class="profile-info__field-value">{{ this.value }}</p>
                    </div>
                {{/each}}
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
`