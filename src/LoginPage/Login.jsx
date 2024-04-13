import React from "react";
import './main.css'


const Login = () => {
  return(
  <>
     <div className="app_container">
        <div className="name">
          <h1 className="h1_login">NOMBRE RESTAURANTE</h1>
          <h2 className="h2_login">'logo restaurante'</h2>
        </div>
        <div className="register-container">
          <span className="title">Ingresar</span>
          <span className="sub_titulo">Login</span>
          <form>
            <input type="text" placeholder="Nombre"></input>
            <form className="second">
              <input type="email" placeholder="Usuario"></input>
              <input type="password" placeholder="Contraseña"></input>
            </form>
            <button>Acceder</button>
          </form>
          <p>Todavía no tienes cuenta? Registrar</p>
        </div>
      </div>
  </>
  ) 
}

export default Login