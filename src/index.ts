import './styles/base.scss';

import { registerComponent, Store, Router }  from './core';
import { defaultState } from './store';
import { initApp } from './services/initApp';

import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ProfilePage from './pages/profile';
import EditProfilePage from './pages/editprofile';
import EditPasswordPage from './pages/editpassword';
import EditAvatarPage from './pages/editavatar';
import ChatPage from './pages/chat';
import CreateChatPage from './pages/createchat';
import EditChatPage from './pages/editchat';
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
  .use('/profile/edit', EditProfilePage, {})
  .use('/profile/editpassword', EditPasswordPage, {})
  .use('/profile/editavatar', EditAvatarPage, {})
  .use('/chat', ChatPage, {})
  .use('/chat/add', CreateChatPage, {})
  .use('/chat/edit', EditChatPage, {})
  .use('/error', Page500, {})
  .use('*', NotFound, {})
  .start();

  setTimeout(() => {
    window.store.dispatch(initApp);
  }, 100);

});
