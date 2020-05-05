import {
  TASK_PROJECT,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  SELECT_TASK,
  UPDATE_TASK,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case TASK_PROJECT:
      return {
        ...state,
        currenttask: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        currenttask: [action.payload, ...state.currenttask],
        error: false,
      };
    case VALIDATE_TASK:
      return {
        ...state,
        error: true,
      };
    case DELETE_TASK:
      return {
        ...state,
        currenttask: state.currenttask.filter(
          (task) => task._id !== action.payload
        ),
      };
    case UPDATE_TASK:
      return {
        ...state,
        currenttask: state.currenttask.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        selectedtask: null,
      };
    case SELECT_TASK:
      return {
        ...state,
        selectedtask: action.payload,
      };

    default:
      return state;
  }
};
