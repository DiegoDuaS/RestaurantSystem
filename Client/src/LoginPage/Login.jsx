import React, { useState } from "react";
import md5 from "md5";


const Login = ({setLogIn, setregister}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simplemente para este ejemplo, asumimos que estamos recuperando la contraseña encriptada del almacenamiento local.
    const storedUserData = localStorage.getItem("userData");
    if (!storedUserData) {
      setErrorMessage("Usuario no encontrado. Regístrese primero.");
      return;
    }

    const userData = JSON.parse(storedUserData);
    const { name, email, password: storedPassword } = userData;

    if (username !== name || md5(password) !== storedPassword) {
      setErrorMessage("Nombre de usuario o contraseña incorrectos.");
      return;
    }
    setLogIn(true)
    console.log("Inicio de sesión exitoso!");
  };

  return (
    <div className="app_container">
      <div className="name">
        <h1 className="h1_login">El Fogón Dorado</h1>
        <h2 className="h2_login">'Cualquiera puede cocinar'</h2>
      </div>
      <div className="register-container">
        <span className="title">Ingresar</span>
        <span className="sub_titulo"></span>
        <form>
          <input
            type="text"
            placeholder="Nombre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="second">
            <input type="email" placeholder="Tipo Usuario" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Acceder
          </button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        <p onClick={() => setregister(true)}>Todavía no tienes cuenta? Registrar</p>
      </div>
    </div>
  );
};

export default Login;
