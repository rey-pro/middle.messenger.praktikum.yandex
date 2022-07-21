import { authAPI, userAPI } from '../api';
import type { Dispatch } from '../core';
import { transformUser, apiHasError } from '../utils';

type LoginPayload = {
  login: string;
  password: string;
};

export const login = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload,
) => {
  dispatch({ isLoading: false, formError: null });

  const response = await authAPI.login(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: true, formError: response.reason, formSuccess: null });
    return;
  }

  const responseUser = await userAPI.me();

  if (apiHasError(responseUser)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO), isLoading: true, formError: null, formSuccess: null });

  window.router.go('/chat');
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: false });

  await authAPI.logout();

  dispatch({ isLoading: true, user: null, formError: null, chats: null, currentChat: null, messages: [] });

  window.router.go('/login');
};