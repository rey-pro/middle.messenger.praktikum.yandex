import { chatAPI, userAPI } from '../api';
import { Dispatch } from '../core';
import { default as socket } from './webSocket'
import { transformUser, transformChat, apiHasError } from '../utils';

type CreatePayload = {
    title: string;
};

type AddUserPayload = {
    login: string;
}

type TokenPayload = {
  token: string;
}

type MessagePayload = {
  message: string;
}

export const chats = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: CreatePayload,
) => {
  const response = await chatAPI.chats();

  const result: Array<Chat> = []; 

  if (!apiHasError(response)) {
    (response as Array<ChatDTO>).forEach((value: ChatDTO) => {
      result.push(transformChat(value));
    });
  }

  dispatch({chats: result});

};

export const create = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: CreatePayload,
  ) => {
 
    let response = await chatAPI.create(action);
    
    if (apiHasError(response)) {
      dispatch({ isLoading: true, formError: response.reason });
      return;
    }
  
    response = await chatAPI.chats();

    const result: Array<Chat> = []; 
  
    if (!apiHasError(response)) {
      (response as Array<ChatDTO>).forEach((value: ChatDTO) => {
        result.push(transformChat(value));
      });
    }
  
    dispatch({isLoading: true, formError: null, chats: result});
    
    window.router.go('/chat');
  };

  export const chat = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    id: string,
  ) => {
    const store: AppState = window.store.getState();

    const chats: Array<Chat> | null = store.chats;
    const user: User | null = store.user;

    let currentChat: Chat | null = null; 

    if ( chats ) {
      chats.forEach((value: Chat)=>{
        if ( `${value.id}` === id ) {
          value.active = true;
          currentChat = value;
        } else {
          value.active = false;
        }
      });
    }

    if ( !currentChat ){
      return;
    }  

    let response = await chatAPI.users(id);
    const users: Array<User> = [];
    
    if (!apiHasError(response)) {
      (response as Array<UserDTO>).forEach((value) => {
        users.push(transformUser(value));
      });
    }

    (currentChat as Chat).users = users;
    

    response = await chatAPI.token(id);
    if (apiHasError(response)) {
      window.router.go('/error');
      return;
    }  

    dispatch({isLoading: true, formError: null, chats: chats, currentChat: currentChat, messages: []});

    socket.connect({userId: user?.id, chatId: (currentChat as Chat).id, token: (response as TokenPayload).token });
  };

  export const addUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: AddUserPayload,
  ) => {

    let response = await userAPI.findUser(action);
    const currentChat = window.store.getState().currentChat;

    if ( !currentChat ) {
      return;
    }

    if (apiHasError(response)) {
      dispatch({ isLoading: true, formError: response.reason });
      return;
    }

    const userId: Array<number> = [];
    console.log(response);

    (response as Array<UserDTO>).forEach((value) => {
      if ( value.id ) {
        userId.push(value.id);
        currentChat.users?.push(transformUser(value));
      }
    });

    if ( userId.length === 0 ) {
      dispatch({ isLoading: true, formError: `Пользователь с таким логином не найден` });
      return;
    }

    const addData = {
      users: userId,
      chatId: currentChat?.id
    }; 

    response = await chatAPI.addUser(JSON.stringify(addData));

    if (apiHasError(response)) {
      dispatch({ isLoading: true, formError: response.reason });
      return;
    }

    dispatch({isLoading: true, formError: null, currentChat: currentChat});   
    
    window.router.go('/chat/edit');
  };

  export const deleteUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    id: string,
  ) => {
    const currentChat = window.store.getState().currentChat;

    if ( !currentChat ) {
      return;
    }

    const delData = {
      users: [+Number(id)],
      chatId: currentChat.id
    }; 

    const response = await chatAPI.deleteUser(JSON.stringify(delData));

    if (apiHasError(response)) {
      dispatch({ isLoading: true, formError: response.reason });
      return;
    }

    currentChat.users?.forEach(( value, key ) => {
      if ( `${value.id}` === id) {
        currentChat.users?.splice(key, 1);
      }
    });

    dispatch({isLoading: true, formError: null, currentChat: currentChat});   
    
    window.router.go('/chat/edit');
  };

  export const sendMessage = (action: any) => {
    socket.sendMessage((JSON.parse(action) as MessagePayload).message);
  }

  export const stopMessage = () => {
    socket.leave();
  }