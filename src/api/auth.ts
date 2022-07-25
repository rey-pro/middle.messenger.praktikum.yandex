import HTTPTransport from '../core/HTTPTransport';

type LoginRequestData = {
  login: string;
  password: string;
};

const request = new HTTPTransport();

export const authAPI = {
  login: (data: LoginRequestData): Promise<Record<string, unknown>|ChatDTO[]|APIError> =>
    request.post('auth/signin', {data: data, headers: { 'Content-Type': 'application/json' }}),
  
  logout: (): Promise<Record<string, unknown>|ChatDTO[]|APIError> =>
    request.post('auth/logout'),
};