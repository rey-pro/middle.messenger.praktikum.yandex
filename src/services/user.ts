import { userAPI } from '../api';
import type { Dispatch } from '../core';
import { transformUser, apiHasError } from '../utils';

type CreatePayload = {
  login: string;
  password: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string; 
};

type PasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

type AvatarPayload = {
  avatar: File;
};


export const create = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: CreatePayload,
) => {
  dispatch({ isLoading: false });

  let response;
  try {
    response = await userAPI.create(action);
  } catch (e) {
    dispatch({ isLoading: true, formError: e.message, formSuccess: null });
    return;
  }

  console.log(response);
  if (apiHasError(response)) {
    dispatch({ isLoading: true, formError: response.reason, formSuccess: null });
    return;
  }
  let responseUser
  try {
    responseUser = await userAPI.me();
  }
  catch (e) {
    console.error(e);
  }

  if (apiHasError(responseUser)) {
    window.router.go('/login');
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO), isLoading: true, formError: null, formSuccess: null });

  window.router.go('/chat');
};

export const edit = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: CreatePayload,
) => {
  dispatch({ isLoading: false });

  let response;
  try {
    response = await userAPI.edit(action);
  } catch (e) {
    dispatch({ isLoading: true, formError: e.message, formSuccess: null });
    return;
  }

  console.log(response);
  if (apiHasError(response)) {
    dispatch({ isLoading: true, formError: response.reason, formSuccess: null });
    return;
  }

  dispatch({ user: transformUser(response as UserDTO), isLoading: true, formError: null, formSuccess: null });

  window.router.go('/profile');
};

export const changePassword = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: PasswordPayload,
) => {
  dispatch({ isLoading: false });
  let response;
  try {
    response = await userAPI.editPassword(action);
  } catch (e) {
    dispatch({ isLoading: true, formError: e.message, formSuccess: null });
    return;
  }
  console.log(response);
  
  if (apiHasError(response)) {
    dispatch({ isLoading: true, formError: response.reason, formSuccess: null });
    return;
  }

  dispatch({ isLoading: true, formError: null });

  window.router.go('/profile');
};

export const changeAvatar = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: AvatarPayload,
) => {
  dispatch({ isLoading: false });
  let response;
  try {
    response = await userAPI.editAvatar(action);
  } catch (e) {
    dispatch({ isLoading: true, formError: e.message, formSuccess: null });
    return;
  }
  console.log(response);
  
  if (apiHasError(response)) {
    dispatch({ isLoading: true, formError: response.reason, formSuccess: null });
    return;
  }

  dispatch({ user: transformUser(response as UserDTO), isLoading: true, formError: null, formSuccess: null });

  window.router.go('/profile');
};
