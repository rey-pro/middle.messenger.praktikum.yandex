import './styles/base.scss';

import { registerComponent, Store, Router }  from './core';
import { defaultState } from './store';
import { initApp } from './services/initApp';

import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ProfilePage from './pages/profile';
import EditprofilePage from './pages/editprofile';
import EditpasswordPage from './pages/editpassword';
import EditavatarPage from './pages/editavatar';
import ChatPage from './pages/chat';
import CreatechatPage from './pages/createchat';
import EditchatPage from './pages/editchat';
import NotFound from './pages/page404';
import Page500 from './pages/page500';

import * as components from './components';

Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});

declare global {
  interface Window {
    store: Store<AppState>;
    router: Router;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const store = new Store<AppState>(defaultState);
  const router = new Router();

  window.router = router;
  window.store = store;

  router
  .use('/', ChatPage, {})
  .use('/login', LoginPage, {})
  .use('/profile', ProfilePage, {})
  .use('/register', RegisterPage, {})
  .use('/profile/edit', EditprofilePage, {})
  .use('/profile/editpassword', EditpasswordPage, {})
  .use('/profile/editavatar', EditavatarPage, {})
  .use('/chat', ChatPage, {})
  .use('/chat/add', CreatechatPage, {})
  .use('/chat/edit', EditchatPage, {})
  .use('/error', Page500, {})
  .use('*', NotFound, {})
  .start();

  setTimeout(() => {
    window.store.dispatch(initApp);
  }, 100);

});
