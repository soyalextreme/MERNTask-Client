import React from "react";
import NewProject from "../proyects/NewProject";
import ProjectsList from "../proyects/ProjectsList";

const SideBar = () => {
  return (
    <aside>
      <h1>
        MERN<span>Task</span>
      </h1>
      <NewProject />
      <div className="proyectos">
        <h2>Tus Proyectos</h2>
        <ProjectsList />
      </div>
    </aside>
  );
};

export default SideBar;
