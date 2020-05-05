import {
  FORMULARIO_PROYECTO,
  GET_PROJECTS,
  ADD_PROJECT,
  VALIDATE_FORM,
  CURRENT_PROJECT,
  DELETE_PROJECT,
  PROJECT_ERROR,
} from "../../types/";

export default (state, action) => {
  switch (action.type) {
    case FORMULARIO_PROYECTO:
      return { ...state, form: true };
    case GET_PROJECTS:
      return { ...state, projects: action.payload };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        form: false,
        errorform: false,
      };
    case VALIDATE_FORM:
      return {
        ...state,
        errorform: true,
      };
    case CURRENT_PROJECT:
      return {
        ...state,
        currentproject: state.projects.filter(
          (project) => project._id === action.payload
        )[0],
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((item) => item._id !== action.payload),
        currentproject: null,
      };
    case PROJECT_ERROR:
      return {
        ...state,
        msg: action.payload,
      };
    default:
      return state;
  }
};
