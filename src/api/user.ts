import HTTPTransport from '../core/HTTPTransport';

const request = new HTTPTransport();

type PasswordRequestData = {
  oldPassword: string;
  newPassword: string;
};

type AvatarRequestData = {
  avatar: File;
};

type UserRequestData = {
  login: string;
  password: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string; 
};

type SearchByLoginData = {
  login: string;
}

export const userAPI = {
  me: () => 
    request.get('auth/user', {headers: {'Content-Type': 'application/json', accept: 'application/json'}}),
  
  create: (data: UserRequestData) => 
    request.post('auth/signup', {data: data, headers: { 'Content-Type': 'application/json' }}),

  edit: (data: UserRequestData) => 
    request.put('user/profile', {data: data, headers: { 'Content-Type': 'application/json' }}),

  editPassword: (data: PasswordRequestData) => 
    request.put('user/password', {data: data, headers: { 'Content-Type': 'application/json' }}),

  editAvatar: (data: AvatarRequestData) => 
    request.put('user/profile/avatar', {data: data}),

  findUser: (data: SearchByLoginData) => 
    request.post('user/search', {data: data, headers: { 'Content-Type': 'application/json' }})    
};