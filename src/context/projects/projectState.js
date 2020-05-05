import React, { useReducer } from "react";

import projectContext from "./projectContext";
import projectReducer from "./projectReducer";
import {
  FORMULARIO_PROYECTO,
  GET_PROJECTS,
  ADD_PROJECT,
  VALIDATE_FORM,
  CURRENT_PROJECT,
  DELETE_PROJECT,
  PROJECT_ERROR,
} from "../../types";
import clientAxios from "../../config/axios";

const ProjectState = (props) => {
  const initState = {
    form: false,
    projects: [],
    errorform: false,
    currentproject: null,
    msg: null,
  };

  // dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(projectReducer, initState);

  // serie de funciones

  const showForm = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  const fetchProjects = async () => {
    try {
      const res = await clientAxios.get("/api/project");

      dispatch({
        type: GET_PROJECTS,
        payload: res.data.projects,
      });
    } catch (error) {
      const alert = {
        msg: "Hubo un error al borrar",
        category: "alerta-error",
      };

      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      });
    }
  };

  const addNewProject = async (project) => {
    try {
      const res = await clientAxios.post("/api/project", project);
      console.log(res);

      dispatch({
        type: ADD_PROJECT,
        payload: res.data,
      });
    } catch (error) {
      const alert = {
        msg: "Hubo un error al borrar",
        category: "alerta-error",
      };

      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      });
    }
  };

  const showError = () => {
    dispatch({
      type: VALIDATE_FORM,
    });
  };

  const setCurrentProject = (project) => {
    dispatch({
      type: CURRENT_PROJECT,
      payload: project,
    });
  };

  const deleteProject = async (project) => {
    try {
      await clientAxios.delete(`/api/project/${project}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: project,
      });
    } catch (error) {
      const alert = {
        msg: "Hubo un error al borrar",
        category: "alerta-error",
      };

      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      });
    }
  };

  return (
    <projectContext.Provider
      value={{
        form: state.form,
        msg: state.msg,
        showForm,
        projects: state.projects,
        fetchProjects,
        addNewProject,
        errorform: state.errorform,
        showError,
        currentproject: state.currentproject,
        setCurrentProject,
        deleteProject,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
