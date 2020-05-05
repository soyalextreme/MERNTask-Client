import {
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from "../../types/index";

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        auth: true,
        msg: null,
        loading: false,
      };
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        msg: action.payload,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        auth: true,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        auth: null,
        user: null,
        msg: null,
        token: null,
        loading: false,
      };
    default:
      return state;
  }
};
