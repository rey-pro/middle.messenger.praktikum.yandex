import { userAPI } from '../api';
import type { Dispatch } from '../core';
import { transformUser, apiHasError } from '../utils';

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const response = await userAPI.me();

    if (apiHasError(response)) {
      dispatch({ user: null, isLoading: true });
      return;
    }

    dispatch({ user: transformUser(response as UserDTO), isLoading: true });
  } catch (err) {
    console.error(err);
  }
}