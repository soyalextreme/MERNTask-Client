import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import alertContext from "../../context/alert/alertContext";
import authContext from "../../context/auth/authContext";

const Login = (props) => {
  // context
  const { alert, showAlert } = useContext(alertContext);
  const { registerUser, msg, auth } = useContext(authContext);

  // state
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const { username, email, password, confirm } = user;

  // en caso de que se mande la peticion
  useEffect(() => {
    if (auth) {
      props.history.push("/mis-proyectos");
    }
    if (msg) {
      showAlert(msg.msg, msg.category);
      return;
    }
    // eslint-disable-next-line
  }, [msg, auth, props.history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validacion

    if (
      email.trim() === "" ||
      password.trim() === "" ||
      username.trim() === "" ||
      confirm.trim() === ""
    ) {
      showAlert("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    // password 6 caracteres
    if (password.length < 6) {
      showAlert(
        "El password debe ser de al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }

    // passwords iguales
    if (password !== confirm) {
      showAlert("Las contraseñas deben ser iguales", "alerta-error");
      return;
    }

    // pasarlo al action
    registerUser({
      name: username,
      email,
      password,
    });
  };

  return (
    <>
      <div className="form-usuario">
        {alert ? (
          <div className={`alerta ${alert.category}`}>{alert.msg}</div>
        ) : null}
        <div className="contenedor-form sombra-dark">
          <h1>Obtener una Cuenta</h1>
          <form onSubmit={handleSubmit}>
            <div className="campo-form">
              <label htmlFor="username">Nombre</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Alejandro"
                onChange={handleChange}
                value={username}
              />
            </div>
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
              <label htmlFor="confirm">Confirm Password</label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                placeholder="Confirma tu contraseña"
                onChange={handleChange}
                value={confirm}
              />
            </div>

            <div className="campo-form">
              <input
                type="submit"
                className="btn btn-primario btn-block"
                value="Registarme"
              />
            </div>
          </form>
          <Link className="enlace-cuenta" to="/">
            Iniciar Sesion
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
