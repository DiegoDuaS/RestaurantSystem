import './Section.css'
import * as FaIcons from "react-icons/fa"
import React, { useState } from 'react';



function NavBar({ selectedOption, setSelectedOption }) {
    let iconStyles = { color: "black", fontSize: "1.3em" };
    return (
      <nav>
        <ul className='nav'>
          <li className={`nav ${selectedOption === 'restaurante' ? 'selected' : ''}`}><a href="#" className='nava' onClick={() => setSelectedOption('restaurante')}> Restaurante</a></li>
          <li className={`nav ${selectedOption === 'cocina' ? 'selected' : ''}`}><a href="#" className='nava' onClick={() => setSelectedOption('cocina')}> Cocina</a></li>
          <li className={`nav ${selectedOption === 'bar' ? 'selected' : ''}`}><a href="#" className='nava' onClick={() => setSelectedOption('bar')}> Bar</a></li>
          <li className={`nav ${selectedOption === 'estadisticas' ? 'selected' : ''}`}><a href="#" className='nava' onClick={() => setSelectedOption('estadisticas')}> Estadisticas</a></li>
          <div className='space'></div>
          <li className='signout'><FaIcons.FaSignOutAlt style={iconStyles}></FaIcons.FaSignOutAlt><a href="#" className='nava'>Sign Out</a></li>
        </ul>
      </nav>
    );
  }

export default NavBar