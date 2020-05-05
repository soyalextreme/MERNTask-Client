import React, { useContext } from "react";
import authContext from "../../context/auth/authContext";

const Bar = () => {
  const { user, logOut } = useContext(authContext);

  return (
    <header className="app-header">
      {user ? (
        <p className="nombre-usuario">
          Hola <span>{user.name}</span>
        </p>
      ) : null}
      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={() => logOut()}
        >
          Cerrar Sesion
        </button>
      </nav>
    </header>
  );
};

export default Bar;
