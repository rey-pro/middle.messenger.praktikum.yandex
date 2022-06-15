import { renderDOM }  from '../../../core';
import {Error} from "../error";


document.addEventListener("DOMContentLoaded", () => {
    renderDOM(new Error({detail: 'Internal server error', code: 500}));
});