import Restaurante from './Restaurante/Restaurante'
import Bar from './Comestibles/Bar'
import Estadisticas from './Stats/Estadisticas'
import Cocina from './Comestibles/Cocina'
import HeaderMain from './MainPage/Header'
import NavBar from './MainPage/Nav'
import './MainPage/Main.css'
import React, { useState } from 'react';


function App() {

  const [selectedOption, setSelectedOption] = useState('restaurante');

  return (
    <>
      <main class='main-content'>
        <HeaderMain></HeaderMain>
        {selectedOption === 'restaurante' && <Restaurante />}
        {selectedOption === 'cocina' && <Cocina />}
        {selectedOption === 'bar' && <Bar />}
        {selectedOption === 'estadisticas' && <Estadisticas />}
        <NavBar selectedOption={selectedOption} setSelectedOption={setSelectedOption}></NavBar>
        
      </main>
       
    </>
  )
}

export default App
