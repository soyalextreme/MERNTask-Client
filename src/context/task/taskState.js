import React, { useReducer } from "react";

import TaskContext from "./taskContext";
import TaskReducer from "./taskReducer";
import {
  TASK_PROJECT,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  SELECT_TASK,
  UPDATE_TASK,
} from "../../types";
import clientAxios from "../../config/axios";

const TaskState = (props) => {
  const initialState = {
    currenttask: [],
    error: false,
    selectedtask: null,
  };

  // crear el state y el dispatch
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  // actions for modifiying the state

  const getTask = async (projectId) => {
    try {
      const res = await clientAxios.get("/api/task", { params: { projectId } });
      dispatch({
        type: TASK_PROJECT,
        payload: res.data.task,
      });
    } catch (error) {}
  };

  const addTask = async (task) => {
    try {
      await clientAxios.post("/api/task", task);
      dispatch({
        type: ADD_TASK,
        payload: task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK,
    });
  };

  const deleteTask = async (id, projectId) => {
    try {
      await clientAxios.delete(`/api/task/${id}`, {
        params: { projectId },
      });
      dispatch({
        type: DELETE_TASK,
        payload: id,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const editTask = (task) => {
    dispatch({
      type: SELECT_TASK,
      payload: task,
    });
  };

  const updateTask = async (task) => {
    try {
      await clientAxios.put(`/api/task/${task._id}`, task);
      dispatch({
        type: UPDATE_TASK,
        payload: task,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        getTask,
        currenttask: state.currenttask,
        addTask,
        error: state.error,
        validateTask,
        deleteTask,
        editTask,
        selectedtask: state.selectedtask,
        updateTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
