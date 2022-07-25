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
    request.get('auth/user'),
  
  create: (data: UserRequestData) => 
    request.post('auth/signup'),

  edit: (data: UserRequestData) => 
    request.put('user/profile'),

  editPassword: (data: PasswordRequestData) => 
    request.put('user/password'),

  editAvatar: (data: AvatarRequestData) => 
    request.put('user/profile/avatar', {data: data}),

  findUser: (data: SearchByLoginData) => 
    request.post('user/search')
};