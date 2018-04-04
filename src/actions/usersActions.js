import { apiServer } from '../config';

export function fetchUsers() {
  return async dispatch => {
    try {
      dispatch({ type: 'FETCH_USERS_PENDING' });

      const api = `${apiServer}/users`;
      const response = await fetch(api);
      const users = await response.json();

      dispatch({
        type: 'FETCH_USERS_FULFILLED',
        payload: users
      });
    } catch (e) {
      dispatch({
        type: 'FETCH_USERS_REJECTED',
        payload: e
      });
    }
  };
}
