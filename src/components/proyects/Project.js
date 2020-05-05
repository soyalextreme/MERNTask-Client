import React, { useContext } from "react";

import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/task/taskContext";

const Project = ({ project }) => {
  const { setCurrentProject } = useContext(projectContext);
  const { getTask } = useContext(taskContext);

  const { name, _id } = project;

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => {
          setCurrentProject(_id); // setear projecto actual
          getTask(_id); // obtener tareas del proyecto
        }}
      >
        {name}
      </button>
    </li>
  );
};

export default Project;
