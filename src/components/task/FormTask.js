import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/projects/projectContext";
import taskContext from "../../context/task/taskContext";

const FormTask = () => {
  const { currentproject } = useContext(proyectoContext);
  const {
    addTask,
    validateTask,
    error,
    getTask,
    selectedtask,
    updateTask,
  } = useContext(taskContext);

  const [task, setTask] = useState({
    name: "",
  });

  useEffect(() => {
    if (selectedtask !== null) {
      setTask({ name: selectedtask.name });
    } else {
      setTask({ name: "" });
    }
  }, [selectedtask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  if (!currentproject) return null;

  // valores de la tarea
  const { name } = task;

  return (
    <div className="formulario">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // validacion
          if (name.trim() === "") {
            validateTask();
            return;
          }

          // validar si es edicion o agregar una tarear
          if (selectedtask === null) {
            task.projectId = currentproject._id;
            // agregar
            addTask(task);
          } else {
            // actualizar
            selectedtask.name = task.name;
            updateTask(selectedtask);
            return;
          }

          // reiniciar form y obenter las nuevas tareas
          getTask(currentproject._id);
          setTask({ name: "" });
        }}
      >
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            name="name"
            placeholder="Nombre de la tarea"
            onChange={handleChange}
            value={name}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={selectedtask ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {error ? (
        <p className="mensaje error">Nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTask;
