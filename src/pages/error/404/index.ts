import { renderDOM }  from '../../../core';
import {Error} from "../error";


document.addEventListener("DOMContentLoaded", () => {
    renderDOM(new Error({detail: 'Page not found', code: 404}));
});