import React, { useState } from 'react';
import '../Mesas/Box.css';
import Top from './Filter';
import Platos from './platos';
import Horario from './horarios';
import QuejasPersona from './quejasPersona';
import QuejasPlatos from './quejasPlatos';
import Promedio from './promedio';
import Eficiencia from './eficiencia';

function Estadisticas() {
  // Estados para manejar las selecciones del menú desplegable y los receptores de fechas
  const [selectedOption, setSelectedOption] = useState('platos');
  const [startDate, setStartDate] = useState('2024-04-12');
  const [endDate, setEndDate] = useState('2024-04-13');
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreate = async () => {
    console.log(startDate)
    console.log(endDate)
    try {
      if (selectedOption === 'quejasPlatos') {
         // Suponiendo que `startDate` y `endDate` son las fechas seleccionadas por el usuario
         const response = await fetch('http://127.0.0.1:3002/stats/quejas_platos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fecha_inicial: startDate,
            fecha_final: endDate
          })
        });
        if (response.ok) {
          const result = await response.json();
          // Actualizar el estado para mostrar los datos de quejas de platos
          setResponseData(result);
          setSelectedOption(selectedOption);
        } else {
          throw new Error('Error al obtener las quejas de platos');
        }
      

      } 
      else if (selectedOption === 'eficiencia') {
        const response = await fetch('http://127.0.0.1:3002/stats/eficiencia_meseros1');
        if (response.ok) {
          const result = await response.json();
          // Actualizar el estado para mostrar los datos de eficiencia
          setResponseData(result);
          setSelectedOption(selectedOption);
        } else {
          throw new Error('Error al obtener la eficiencia de los meseros');
        }
      }
      else if(selectedOption === 'quejasPersona') {
        // Suponiendo que `startDate` y `endDate` son las fechas seleccionadas por el usuario
        const response = await fetch('http://127.0.0.1:3002/stats/quejas_empleados', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           fecha_inicial: startDate,
           fecha_final: endDate
         })
       });
       if (response.ok) {
         const result = await response.json();
         // Actualizar el estado para mostrar los datos de quejas de platos
         setResponseData(result);
         setSelectedOption(selectedOption);
       } else {
         throw new Error('Error al obtener las quejas de platos');
       }
     } 
     else if(selectedOption === 'horario') {
      // Suponiendo que `startDate` y `endDate` son las fechas seleccionadas por el usuario
      const response = await fetch('http://127.0.0.1:3002/stats/horarios_pedidos', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         fecha_inicial: startDate,
         fecha_final: endDate
       })
     });
     if (response.ok) {
       const result = await response.json();
       // Actualizar el estado para mostrar los datos de quejas de platos
       setResponseData(result);
       setSelectedOption(selectedOption);
     } else {
       throw new Error('Error al obtener las quejas de platos');
     }
   } 
   else if(selectedOption === 'platos') {
    // Suponiendo que `startDate` y `endDate` son las fechas seleccionadas por el usuario
    const response = await fetch('http://127.0.0.1:3002/stats/platos_mas_pedidos', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       fecha_inicial: startDate,
       fecha_final: endDate
     })
   });
   if (response.ok) {
     const result = await response.json();
     // Actualizar el estado para mostrar los datos de quejas de platos
     setResponseData(result);
     setSelectedOption(selectedOption);
   } else {
     throw new Error('Error al obtener las quejas de platos');
   }
 } 
 else if(selectedOption === 'promedio') {
  // Suponiendo que `startDate` y `endDate` son las fechas seleccionadas por el usuario
  const response = await fetch('http://127.0.0.1:3002/stats/promedio_comidas', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({
     fecha_inicial: startDate,
     fecha_final: endDate
   })
 });
 if (response.ok) {
   const result = await response.json();
   // Actualizar el estado para mostrar los datos de quejas de platos
   setResponseData(result);
   setSelectedOption(selectedOption);
 } else {
   throw new Error('Error al obtener las quejas de platos');
 }
} 
    } catch (error) {
      console.error(error);
      setErrorMessage('Error al obtener los datos solicitados');
    }

  };

  return (
    <>
      <section className='main'>
        <div className='cardbox'>
          <header className='headerbox'>
            Estadísticas del negocio
          </header>
          <div className='stats_add'>
            <Top
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
            <button onClick={handleCreate}>Crear</button>
            {selectedOption === 'eficiencia' && <Eficiencia />}
            {selectedOption === 'platos' && <Platos />}
            {selectedOption === 'horario' && <Horario />}
            {selectedOption === 'promedio' && <Promedio />}
            {selectedOption === 'quejasPersona' && <QuejasPersona />}
            {selectedOption === 'quejasPlatos' && <QuejasPlatos />}
            {responseData && (
              <div>
                <pre>{JSON.stringify(responseData, null, 2)}</pre>
              </div>
            )}
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </div>
      </section>
    </>
  );
}

export default Estadisticas;
