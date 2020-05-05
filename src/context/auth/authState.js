import React, { useReducer } from "react";
import {
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from "../../types/index";
import authReducer from "./authReducer";
import authContext from "./authContext";
import clientAxios from "../../config/axios";
import { tokenAuth } from "../../config/tokenAuth";

const AuthState = (props) => {
  const initState = {
    token: localStorage.getItem("token"),
    auth: null,
    user: null,
    msg: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(authReducer, initState);

  const registerUser = async (data) => {
    try {
      const res = await clientAxios.post("/api/users/", data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      // get User
      userAuth();
    } catch (error) {
      console.log(error.response);
      // creando el error

      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error",
      };

      dispatch({
        type: REGISTER_ERROR,
        payload: alert,
      });
    }
  };

  // Retorna el usuario autenticado

  const userAuth = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      //TODO funcion para enviar el token por headers
      tokenAuth(token);
    }

    try {
      const res = await clientAxios.get("/api/auth");
      dispatch({
        type: GET_USER,
        payload: res.data.user,
      });
    } catch (error) {
      console.log(error.response);

      dispatch({
        type: REGISTER_ERROR,
      });
    }
  };

  const login = async (data) => {
    try {
      const res = await clientAxios.post("/api/auth", data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      userAuth();
    } catch (error) {
      console.log(error.response);
      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alert,
      });
    }
  };

  const logOut = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        user: state.user,
        auth: state.auth,
        msg: state.msg,
        loading: state.loading,
        registerUser,
        login,
        userAuth,
        logOut,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
