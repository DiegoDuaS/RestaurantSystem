import Restaurante from './Restaurante/Restaurante'
import Bar from './Comestibles/Bar'
import Estadisticas from './Stats/Estadisticas'
import Cocina from './Comestibles/Cocina'
import HeaderMain from './MainPage/Header'
import NavBar from './MainPage/Nav'
import './MainPage/Main.css'
import Login from './LoginPage/Login'
import Register from './LoginPage/Registe'
import React, { useState } from 'react';


function Main(){
  const [selectedOption, setSelectedOption] = useState('restaurante');

  const userId = localStorage.getItem('id');

  return (
    <>
      <main class='main-content'>
        <HeaderMain id={userId}></HeaderMain>
        {selectedOption === 'restaurante' && <Restaurante />}
        {selectedOption === 'cocina' && <Cocina />}
        {selectedOption === 'bar' && <Bar />}
        {selectedOption === 'estadisticas' && <Estadisticas />}
        {selectedOption === 'login' && <Login />}
        <NavBar selectedOption={selectedOption} setSelectedOption={setSelectedOption}></NavBar>
        
      </main>
       
    </>
  )

}

function Registro({setLogIn}){

const [register, setregister] = useState(false)

return (
  <>
   {!register && <Login  setLogIn={setLogIn} setRegister={setregister}> </Login>}
   {register && <Register setLogIn={setLogIn} setRegister={setregister}> </Register>}
  </>
)

}

function App() {

  const [logedin, setLogIn] = useState(false)

  return (
    <>
      {!logedin && <Registro setLogIn={setLogIn}> </Registro>}
      {logedin && <Main></Main>}
       
    </>
  )
}

export default App


