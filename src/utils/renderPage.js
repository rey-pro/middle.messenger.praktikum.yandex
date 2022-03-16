import detectPath from './detectPath'
import {page as authPage} from "../pages/auth/auth";
import {page as registerPage} from "../pages/register/register";
import {page as pageNotFound} from "../pages/pageError/404/404";

function renderPage() {
    let path = detectPath();
    if(['/', '/auth'].includes(path)) {
        return authPage;
    }

    if(['/register'].includes(path)) {
        return registerPage;
    }

    return pageNotFound;
}

module.exports = renderPage;
