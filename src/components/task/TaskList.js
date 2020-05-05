import React, { useContext } from "react";
import Task from "./Task";
import proyectoContext from "../../context/projects/projectContext";
import taskContext from "../../context/task/taskContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TaskList = () => {
  const { currentproject, deleteProject } = useContext(proyectoContext);
  const { currenttask } = useContext(taskContext);

  if (!currentproject) {
    return (
      <h2>
        Selecciona un proyecto
        <span role="img" aria-label="emoji de brillo">
          🎈
        </span>
      </h2>
    );
  }

  return (
    <>
      <h2>Proyecto:{currentproject.name}</h2>
      <ul className="listado-tareas">
        {currenttask.length === 0 ? (
          <li className="tarea">
            <p>No Hay Tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {currenttask.map((item) => (
              <CSSTransition key={item._id} timeout={200} classNames="tarea">
                <Task task={item} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => {
          deleteProject(currentproject._id);
        }}
      >
        Eliminar Proyecto &times;
      </button>
    </>
  );
};

export default TaskList;
