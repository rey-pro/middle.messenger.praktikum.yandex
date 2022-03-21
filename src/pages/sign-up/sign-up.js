import Handelbars from 'handlebars';
import template from './sign-up.tpl';

document.addEventListener('DOMContentLoaded', () => {
    const compiled = Handelbars.compile(template);
    const html = compiled({
        fields: [
            {name: 'Почта', id: 'email', type: 'email'},
            {name: 'Логин', id: 'login', type: 'text'},
            {name: 'Имя', id: 'first-name', type: 'text'},
            {name: 'Фамилия', id: 'second-name', type: 'text'},
            {name: 'Телефон', id: 'phone', type: 'tel'},
            {name: 'Пароль', id: 'password', type: 'password'},
            {name: 'Пароль (ещё раз)', id: 'password-second', type: 'password'},
        ]
    });
    window.compiled = compiled;
    document.body.innerHTML = html;
});