import React, { useState, useContext } from "react";
import proyectoContext from "../../context/projects/projectContext";

const NewProject = () => {
  const projectContext = useContext(proyectoContext);
  const {
    form,
    showForm,
    addNewProject,
    errorform,
    showError,
  } = projectContext;

  const [project, setproject] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setproject({ ...project, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validar el proyecto
    if (name.trim() === "") {
      showError();
      return;
    }

    // agregar al state
    addNewProject(project);

    //reiniciar el form
    setproject("");
  };

  const { name } = project;

  return (
    <>
      {form ? (
        <form className="formulario-nuevo-proyecto" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre del Proyecto"
            name="name"
            onChange={handleChange}
            value={name}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : (
        <button
          type="button"
          className="btn btn-block btn-primario"
          onClick={() => showForm()}
        >
          Nuevo Proyecto
        </button>
      )}
      {errorform ? (
        <p className="mensaje error">Nombre del proyecto es obligatorio</p>
      ) : null}
    </>
  );
};

export default NewProject;
