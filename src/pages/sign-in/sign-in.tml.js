export default `<div class="log-in-page">
    <main class="log-in-block">
        <h1 class="log-in-header basic-header">Вход</h1>
        <form class="log-in-form" action="" id="form-root">
            <div class="log-in-fields">
                <label class="basic-label">Логин
                    <input class="login basic-input" type="text">
                    <div class="input-err login-err">Неверный логин</div>
                </label>
                <label class="basic-label">Пароль
                    <input class="password basic-input" type="password">
                    <div class="input-err password-err">Неверный пароль</div>
                </label>
            </div>
            <div>
                <button class="log-in-button basic-button" type="submit">Авторизоваться</button>
            </div>
        </form>
        <a href="/sign-up.html" class="log-in-no-account-link basic-link">Нет аккаунта?</a>
    </main>
</div>`