import React, { useState } from "react";
import md5 from "md5";
import './main.css';

const Login = ({ setLogIn, setRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: username, // Cambiado el nombre del campo
          password: password// Contraseña encriptada con MD5
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Inicio de sesión exitoso!");
        console.log(password);
        localStorage.setItem('id', username);
        setLogIn(true);
      } else if (response.status === 401) {
        setErrorMessage("Nombre de usuario o contraseña incorrectos.");
      } else {
        setErrorMessage("Error interno del servidor.");
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage("Error al conectarse al servidor.");
    }
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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="second">
            <input type="text" placeholder="Tipo Usuario" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Acceder</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        <p onClick={() => setregister(true)}>Todavía no tienes cuenta? Registrar</p>
      </div>
    </div>
  );
};

export default Login;
