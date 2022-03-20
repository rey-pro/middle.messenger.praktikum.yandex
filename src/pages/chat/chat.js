import Handelbars from 'handlebars';
import template from './chat.tpl';

document.addEventListener('DOMContentLoaded', () => {
    const compiled = Handelbars.compile(template);
    const html = compiled({});
    window.compiled = compiled;
    document.body.innerHTML = html;
});