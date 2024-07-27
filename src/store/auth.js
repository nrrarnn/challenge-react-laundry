const token = localStorage.getItem("token");

const DEFAULT_STATE = {
  token : token
}

export const authReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
}