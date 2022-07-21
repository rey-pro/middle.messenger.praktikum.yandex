import HTTPTransport from '../core/HTTPTransport';

type LoginRequestData = {
  login: string;
  password: string;
};

const request = new HTTPTransport();

export const authAPI = {
  login: (data: LoginRequestData) =>
    request.post('auth/signin', {data: data, headers: { 'Content-Type': 'application/json' }}),
  
  logout: () => 
    request.post('auth/logout'),
};