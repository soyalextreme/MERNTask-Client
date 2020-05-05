import React, { useContext, useEffect } from "react";
import SideBar from "../layout/SideBar";
import Bar from "../layout/Bar";
import FormTask from "../task/FormTask";
import TaskList from "../task/TaskList";
import authContext from "../../context/auth/authContext";

const Proyects = () => {
  const { userAuth } = useContext(authContext);

  useEffect(() => {
    userAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="contenedor-app">
      <SideBar />
      <div className="seccion-principal">
        <Bar />
        <main>
          <FormTask />

          <div className="contenedor-tareas">
            <TaskList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyects;
