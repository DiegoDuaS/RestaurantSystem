import React, { useState } from "react";
import md5 from "md5";
import './main.css';

const Register = ({ setLogIn, setRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    password: "",
    area: ""
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, type, password, area } = formData;

    try {
      // Encriptar la contraseña usando MD5
      const encryptedPassword = md5(password);

      // Hacer la solicitud al backend para registrar al usuario
      const response = await fetch('http://127.0.0.1:3002/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          trabajo: type, // Assuming 'type' corresponds to 'trabajo' in backend
          password: encryptedPassword,
          area
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("¡Registro exitoso!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);

        // Limpiar el formulario después de registrar al usuario
        setFormData({
          name: "",
          type: "",
          password: "",
          area: ""
        });

        setLogIn(true);
      } else {
        setErrorMessage(data.error || "Error al registrar usuario.");
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setErrorMessage("Error al registrar usuario.");
    }
  };

  return (
    <>
      <div className="app_container">
        <div className="name">
          <h1 className="h1_login">El Fogón Dorado</h1>
          <h2 className="h2_login">'Cualquiera puede cocinar'</h2>
        </div>
        <div className="register-container">
          <span className="title">Registrar</span>
          <span className="sub_titulo"></span>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Tipo Usuario"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Área"
              name="area"
              value={formData.area}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">Crear</button>
          </form>
          {successMessage && <p>{successMessage}</p>}
          {errorMessage && <p>{errorMessage}</p>}
          <p onClick={() => setRegister(false)}>¿Ya tienes cuenta? Ingresar</p>
        </div>
      </div>
    </>
  );
};

export default Register;
