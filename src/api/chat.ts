import HTTPTransport from '../core/HTTPTransport';

const request = new HTTPTransport();

type CreateChatData = {
  title: string
};

export const chatAPI = {
  chats: () => 
    request.get('chats'),
  
  create: (data: CreateChatData) =>
    request.post('chats', {data: data, headers: {'Content-Type': 'application/json', accept: 'application/json'}}),  

  users: (id: string) =>
    request.get(`chats/${id}/users`),
  
  addUser: (data: any) =>
    request.put('chats/users', {data: data, headers: {'Content-Type': 'application/json', accept: 'application/json'}}),

  deleteUser: (data: any) =>
    request.delete('chats/users', {data: data, headers: {'Content-Type': 'application/json', accept: 'application/json'}}),  

  token: (id: string) =>
    request.post(`chats/token/${id}`),

};