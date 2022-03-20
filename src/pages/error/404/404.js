import Handelbars from 'handlebars';
import template from '../error.tml';

document.addEventListener('DOMContentLoaded', () => {
    const compiled = Handelbars.compile(template);
    const html = compiled({
        errorCode: 404,
        errorDetail: 'Не туда попали'
    });
    window.compiled = compiled;
    document.body.innerHTML = html;
});