import {chatAPI, userAPI} from '../api';
import type { Dispatch } from '../core';
import { transformUser, apiHasError } from '../utils';

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    let response;
    try {
      response = await userAPI.me();
    } catch (e) {
      console.error(e);
      dispatch({ user: null, isLoading: true });
      return;
    }

    if (apiHasError(response)) {
      dispatch({ user: null, isLoading: true });
      return;
    }

    dispatch({ user: transformUser(response as UserDTO), isLoading: true });
  } catch (err) {
    console.error(err);
  }
}