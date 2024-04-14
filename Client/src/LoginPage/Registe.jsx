import React, { useState } from "react";
import md5 from "md5";
import './main.css'


const Register = ({setLogIn}) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    password: ""
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, type, password } = formData;
  
    // Verificar si el nombre de usuario ya está en uso
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const existingUser = JSON.parse(storedUserData);
      if (existingUser.name === name) {
        setErrorMessage("El nombre de usuario ya está en uso.");
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
        return; 
      }
    }
    setLogIn(true)
  
    // Encriptar la contraseña usando MD5
    const encryptedPassword = md5(password);
  
    // Guardar los datos del nuevo usuario en el almacenamiento local
    localStorage.setItem("userData", JSON.stringify({ name, type, password: encryptedPassword }));
  
    // Limpiar el formulario después de registrar al usuario
    setFormData({
      name: "",
      type: "",
      password: ""
    });
  
    setSuccessMessage("¡Registro exitoso!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);

    
    console.log(encryptedPassword)
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
          <p>¿Ya tienes cuenta? Ingresar</p>
        </div>
      </div>
    </>
  );
};

export default Register;
