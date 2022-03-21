export default `
<main class="sign-in-page">
    <div class="sign-in-block">
        <h1 class="sign-in-header basic-header">Регистрация</h1>
        <form class="sign-in-form" action="" id="form-root">
            {{#each fields}}                
                <label class="sign-in-label basic-label">{{ this.name }}<input class="{{ this.id }} basic-input" type="{{ this.type }}">
                    <div class="input-err {{ this.id }}-err"></div>
                </label>
            {{/each}}
            <div>
                <button class="sign-in-button basic-button" type="submit">Зарегистрироваться</button>
            </div>
        </form>
        <a href="sign-in.html" class="sign-in-link-to-log-in basic-link">Войти</a>
    </div>
</main>
`