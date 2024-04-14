import React, { useState } from 'react';

import '/src/Mesas/Box.css'
import Top from './Filter'
import Platos from './platos'
import Horario from './horarios'
import QuejasPersona from './quejasPersona'
import QuejasPlatos from './quejasPlatos'
import Promedio from './promedio'
import Eficiencia from './eficiencia'

function Estadisticas() {
    // Estados para manejar las selecciones del menú desplegable y los receptores de fechas
    const [selectedOption, setSelectedOption] = useState('platos');
    const [startDate, setStartDate] = useState('1990-02-03');
    const [endDate, setEndDate] = useState('1990-02-03');

  return (
    <>
        <section>
            <div className='cardbox'>
              <header className='headerbox'>
                Estadísticas del negocio
              </header>
              <Top 
              selectedOption={selectedOption} setSelectedOption={setSelectedOption} 
              startDate={startDate} setStartDate={setStartDate}
              endDate={endDate} setEndDate={setEndDate} />
              {selectedOption === 'platos' && <Platos />}
              {selectedOption === 'horario' && <Horario />}
              {selectedOption === 'promedio' && <Promedio />}
              {selectedOption === 'quejasPersona' && <QuejasPersona />}
              {selectedOption === 'quejasPlatos' && <QuejasPlatos />}
              {selectedOption === 'eficiencia' && <Eficiencia />}
            </div>
          </section>
    </>
  )
}

export default Estadisticas