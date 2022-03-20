export default `<main class="sign-in-page">
    <div class="sign-in-block">
        <h1 class="sign-in-header basic-header">Регистрация</h1>
        <form class="sign-in-form" action="" id="form-root">
            <label class="sign-in-label basic-label">Почта<input class="email basic-input" type="email">
                <div class="input-err email-err"></div>
            </label>
            <label class="sign-in-label basic-label">Логин<input class="login basic-input" type="text">
                <div class="input-err login-err"></div>
            </label>
            <label class="sign-in-label basic-label">Имя<input class="first-name basic-input" type="text">
                <div class="input-err first-name-err"></div>
            </label>
            <label class="sign-in-label basic-label">Фамилия<input class="second-name basic-input" type="text">
                <div class="input-err second-name-err"></div>
            </label>
            <label class="sign-in-label basic-label">Телефон<input class="phone basic-input" type="tel">
                <div class="input-err phone-err"></div>
            </label>
            <label class="sign-in-label basic-label">Пароль<input class="password basic-input" type="password">
                <div class="input-err password-err"></div>
            </label>
            <label class="sign-in-label basic-label">Пароль (ещё раз)<input class="password-second basic-input" type="password">
                <div class="input-err password-second-err"></div>
            </label>
            <div><button class="sign-in-button basic-button" type="submit">Зарегистрироваться</button></div></form>
        <a href="sign-in.html" class="sign-in-link-to-log-in basic-link">Войти</a>
    </div>
</main>
`