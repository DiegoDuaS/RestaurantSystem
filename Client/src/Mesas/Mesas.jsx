import './Box.css'
import Areas from './Areas'
import Mesa from './mesa'
import Areasinfo from './areasinfo'
import React, { useState, useEffect } from 'react';

function Mesas({ setIsSelected, mesaIdSelected, onSelectMesa }) { 

    const [areaselected, setAreaSelected] = useState(1);
    const [areasData, setAreasData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [mesasData, setMesasData] = useState(null);

    useEffect(() => {
      handleSubmitArea();
      handleSubmitMesas(); 
  }, []); 

    const handleSubmitArea = async () => {
        try {
          const response = await fetch('http://127.0.0.1:3002/areas', {
            method: 'GET',
          });
    
          if (response.ok) {
            const data = await response.json();
            setAreasData(data); // Almacena los datos en el estado del componente
          } else if (response.status === 401) {
            setErrorMessage("No se pudo llamar a las Áreas");
          } else {
            setErrorMessage("Error interno del servidor.");
          }
        } catch (error) {
          console.error('Error al llamar', error);
          setErrorMessage("Error al conectarse al servidor.");
        }
    };

    const handleSubmitMesas = async () => { 
      try {

        if (!areasData || !areasData[areaselected]) {
          console.error('No hay áreas seleccionadas o el área seleccionada no existe');
          return;
        }

        console.log(areaselected)
        const response = await fetch('http://127.0.0.1:3002/mesas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idArea: areaselected
          })
        });
    
        if (response.ok) {
          const data = await response.json();
          setMesasData(data);
        } else if (response.status === 401) {
          setErrorMessage("No se pudo llamar a las mesas");
        } else {
          setErrorMessage("Error interno del servidor.");
        }
      } catch (error) {
        console.error('Error al llamar las mesas', error);
        setErrorMessage("Error al conectarse al servidor.");
      }
    };
    
  return (
    <>
      <div class='cardbox'>
        <header class='headerbox'>
          Mesas\
        </header>
        <Areas areasData={areasData} AreaSelected={areaselected} setAreaSelected={setAreaSelected} handleSubmitMesas={handleSubmitMesas}></Areas>
        <ul class='mesacontainer'>
        {mesasData && mesasData.map((mesa, index) => (
          <Mesa num={mesa.id_mesa} available={mesa.ocupado} setIsSelected={setIsSelected} mesaIdSelected={mesaIdSelected} setIdMesaSelected={onSelectMesa} />
        ))}
        </ul>
        <Areasinfo smoke={areasData && areasData[areaselected] ? areasData[areaselected].fumador : null} 
          move={areasData && areasData[areaselected] ? areasData[areaselected].movible : null}></Areasinfo>
      </div>
    </>
  );
}


export default Mesas