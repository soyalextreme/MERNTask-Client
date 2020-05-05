import React, { useContext, useEffect } from "react";
import Project from "./Project";
import proyectoContext from "../../context/projects/projectContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import alertContext from "../../context/alert/alertContext";

const ProjectsList = () => {
  // extrayendo del context
  const { projects, fetchProjects, msg } = useContext(proyectoContext);
  const { alert, showAlert } = useContext(alertContext);

  // proyectos al cargar el componente
  useEffect(() => {
    if (msg) {
      showAlert(msg.msg, msg.category);
    }
    fetchProjects();
    // eslint-disable-next-line
  }, [msg]);

  return (
    <>
      {alert ? (
        <div className={`alerta ${alert.category}`}>{alert.msg}</div>
      ) : null}
      {projects.length <= 0 ? (
        <p>
          <span role="img" aria-label="emoji de brillo">
            ✨
          </span>
          Comienza creando un proyecto{" "}
        </p>
      ) : (
        <ul className="listado-proyectos">
          <TransitionGroup>
            {projects.map((item) => (
              <CSSTransition key={item._id} timeout={500} classNames="proyecto">
                <Project project={item} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ul>
      )}
    </>
  );
};

export default ProjectsList;
