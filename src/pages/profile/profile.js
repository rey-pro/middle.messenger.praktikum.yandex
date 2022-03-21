import Handelbars from 'handlebars';
import template from './profile.tml';

document.addEventListener('DOMContentLoaded', () => {
    const compiled = Handelbars.compile(template);
    const html = compiled({
        fields: [
            {name: 'Почта', value: 'alex228@mail.ru'},
            {name: 'Логин', value: 'alex228'},
            {name: 'Имя', value: 'Alex'},
            {name: 'Фамилия', value: 'Petrov'},
            {name: 'Имя в чате', value: 'Alex'},
            {name: 'Телефон', value: '+79999999999'},
            {name: 'Почта', value: 'alex228@mail.ru'},
        ]
    });
    window.compiled = compiled;
    document.body.innerHTML = html;
});