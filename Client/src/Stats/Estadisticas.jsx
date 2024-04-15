import React, { useState } from 'react';
import '../Mesas/Box.css';
import Top from './Filter';

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

  function formatData(responseData) {
    return responseData.map((data) => {
        // Inicializa una lista de cadenas vacía para cada objeto
        let formattedData = [];

        // Recorre todas las claves en el objeto `data`
        for (let key in data) {
            if (data[key] === null) {
              continue; // Si el valor es `null`, salta a la siguiente clave
            }
            if (key === 'hora') {
              // Si la clave es 'hora', formatea el valor según su estructura
              const horaData = data[key];
              
              // Puedes ajustar el formato de hora según tus necesidades
              if (horaData && horaData.hours !== undefined) {
                  formattedData.push(`${key}: ${horaData.hours}`);
              } else {
                  // Manejo por si 'hora' no contiene el campo esperado
                  formattedData.push(`${key}: datos de hora no disponibles`);
              }
          } else if (key === 'promedio') {
            // Si la clave es 'promedio', formatea el valor según su estructura
            const promedioData = data[key];
            if (promedioData && promedioData.hours !== undefined && promedioData.minutes !== undefined) {
                formattedData.push(`promedio: ${promedioData.hours} horas y ${promedioData.minutes} minutos`);
            } else {
                formattedData.push('promedio: datos de promedio no disponibles');
            }
          } else {
              // Construye la cadena en el formato clave: valor para otras claves
              formattedData.push(`${key}: ${data[key]}`);
          }
        }

        // Une las cadenas con una coma y un espacio, luego añade un salto de línea al final
        return formattedData.join(', ') + '\n';
    }).join('');
}

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
            {selectedOption === 'eficiencia' && <h2>Reporte de eficiencia de meseros</h2>}
            {selectedOption === 'platos' && <h2>Platos más pedidos</h2>}
            {selectedOption === 'horario' && <h2>Horarios con más pedidos</h2>}
            {selectedOption === 'promedio' && <h2>Promedio de tiempo que se tardan los clientes en comer</h2>}
            {selectedOption === 'quejasPersona' && <h2>Reporte de quejas agrupadas por persona</h2>}
            {selectedOption === 'quejasPlatos' && <h2>Reporte de quejas agrupadas por plato</h2>}
            {responseData && (
              <div>
                <pre>{formatData(responseData)}</pre>
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
