import React, { useContext } from "react";
import taskContext from "../../context/task/taskContext";
import proyectoContext from "../../context/projects/projectContext";

const Task = ({ task }) => {
  const { deleteTask, getTask, editTask, updateTask } = useContext(taskContext);
  const { currentproject } = useContext(proyectoContext);

  const { name, state } = task;

  // handle delete

  const handleDelete = (id) => {
    deleteTask(id, currentproject._id);
    getTask(currentproject._id);
  };

  const changeState = (taskC) => {
    if (taskC.state === true) {
      taskC.state = false;
    } else {
      taskC.state = true;
    }
    updateTask(taskC);
  };

  const selectTask = (taskC) => {
    editTask(taskC);
  };

  return (
    <>
      <li className="tarea sombra">
        <p>{name}</p>
        <div className="estado">
          {state ? (
            <button
              type="button"
              className="completo"
              onClick={() => {
                changeState(task);
              }}
            >
              Completo
            </button>
          ) : (
            <button
              type="button"
              className="incompleto"
              onClick={() => {
                changeState(task);
              }}
            >
              Incompleto
            </button>
          )}
        </div>
        <div className="acciones">
          <button
            type="button"
            className="btn btn-primario"
            onClick={() => {
              selectTask(task);
            }}
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-secundario"
            onClick={() => {
              handleDelete(task._id);
            }}
          >
            Eliminar
          </button>
        </div>
      </li>
    </>
  );
};

export default Task;
