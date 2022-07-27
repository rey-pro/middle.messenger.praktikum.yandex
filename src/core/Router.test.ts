import 'global-jsdom/register'
import { expect, should } from 'chai'
import { Router } from './Router'
import Block from './Block'

describe('Router test', () => {
  class Login extends Block {
    render() {
        return `<div id="login"></div>`;
    }    
  }
  class Profile extends Block {
    render() {
        return `<div id="profile"></div>`;
    }  
  }
  class Chat extends Block {
    render() {
        return `<div id="chat"></div>`;
    }  
  }
  
  let router = new Router();
 
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';

    router = new Router();
    router
      .use('/login', Login, {})
      .use('/profile', Profile, {})
      .use('/chat', Chat, {})
      .start();
  })

  it('Router history length is correct', () => {
    router.go('/login');
    router.go('/profile');
    router.go('/chat');
    expect(router.getHistoryLength()).to.eq(4);
  })

  it('Router go to correct page', () => {
    router.go('/login');
    expect(document.querySelector('#login')).exist;
  })

  it('Back go to correct page', () => {
    router.go('/login');
    router.go('/chat');
    router.back();
    setTimeout(() => {
        expect(document.querySelector('#login')).exist;
    }, 300);
  })

  it('Forward go to correct page', () => {
    router.go('/login');
    router.go('/chat');
    router.back();
    setTimeout(() => {
        router.forward();
        setTimeout(() => {
            expect(document.querySelector('#chat')).exist;
        }, 300);
    }, 300);
  })
})