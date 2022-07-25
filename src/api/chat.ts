import HTTPTransport from '../core/HTTPTransport';

const request = new HTTPTransport();

type CreateChatData = {
  title: string
};

export const chatAPI = {
  chats: (): Promise<Record<string, unknown>|ChatDTO[]|APIError> =>
    request.get('chats'),
  
  create: (data: CreateChatData): Promise<Record<string, unknown>|ChatDTO[]|APIError> =>
    request.post('chats', {data: data, headers: {'Content-Type': 'application/json', accept: 'application/json'}}),  

  users: (id: string): Promise<Record<string, unknown>|ChatDTO[]|APIError> =>
    request.get(`chats/${id}/users`),
  
  addUser: (data: any): Promise<Record<string, unknown>|ChatDTO[]|APIError> =>
    request.put('chats/users', {data: data, headers: {'Content-Type': 'application/json', accept: 'application/json'}}),

  deleteUser: (data: any): Promise<Record<string, unknown>|ChatDTO[]|APIError> =>
    request.delete('chats/users', {data: data, headers: {'Content-Type': 'application/json', accept: 'application/json'}}),  

  token: (id: string): Promise<Record<string, unknown>|ChatDTO[]|APIError> =>
    request.post(`chats/token/${id}`),

};