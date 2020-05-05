import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import alertContext from "../../context/alert/alertContext";
import authContext from "../../context/auth/authContext";

const NewAcount = ({ history }) => {
  const { alert, showAlert } = useContext(alertContext);
  const { msg, auth, login } = useContext(authContext);
  // state
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validacion
    if (email.trim() === "" || password.trim === "") {
      showAlert("Todos los campos son obligatorios", "alerta-error");
    }

    // action
    login({ email, password });
  };

  useEffect(() => {
    if (auth) {
      history.push("/mis-proyectos");
    }

    if (msg) {
      showAlert(msg.msg, msg.category);
    }
    // eslint-disable-next-line
  }, [msg, auth, history]);

  return (
    <>
      <div className="form-usuario">
        {alert ? (
          <div className={`alerta ${alert.category}`}>{alert.msg}</div>
        ) : null}
        <div className="contenedor-form sombra-dark">
          <h1>Iniciar Sesion</h1>
          <form onSubmit={handleSubmit}>
            <div className="campo-form">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="merntask@gmail.com"
                onChange={handleChange}
                value={email}
              />
            </div>
            <div className="campo-form">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                onChange={handleChange}
                value={password}
              />
            </div>
            <div className="campo-form">
              <input
                type="submit"
                className="btn btn-primario btn-block"
                value="Iniciar Sesion"
              />
            </div>
          </form>
          <Link to="/nueva-cuenta" className="enlace-cuenta">
            Obtener Cuenta
          </Link>
        </div>
      </div>
    </>
  );
};

export default NewAcount;
