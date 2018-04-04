export default function reducer(
  state = {
    user: {},
    fetching: false,
    fetched: false,
    error: null,
    isAuthenticated: localStorage.getItem('user-id') ? true : false
  },
  action
) {
  switch (action.type) {
    case 'FETCH_USER_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_USER_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'FETCH_USER_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        isAuthenticated: true,
        user: action.payload
      };
    }
    case 'USER_SIGNOUT':
      return {
        ...state,
        isAuthenticated: false,
        fetching: false,
        fetched: false,
        error: null
      };
    default:
      return state;
  }
}
