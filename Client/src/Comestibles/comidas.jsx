import React, { useState, useEffect } from 'react';
import './consumibles.css';

function Card({ meal }) {
  const [isPrepared, setIsPrepared] = useState(false);
  const handleButtonClick = () => {
    setIsPrepared((prevIsPrepared) => !prevIsPrepared);
  };
  const cardClass = `card ${isPrepared ? 'prepared' : ''}`;

  return (
    <div className={cardClass}>
        <h2>{meal.comida}</h2>
        <p>Cantidad: {meal.cantidad}</p>
        <p>Pedido: #{meal.pedido}</p>
        <p>Hora de solicitud: {meal.hora.slice(0, 5)}</p>
        <button className="button" onClick={handleButtonClick}>Servido</button>
    </div>
  );

}

function comestibles_card() {
  const [mealsData, setMealsData] = useState([]);

    useEffect(() => {
        // Define la URL de tu servidor
        const url = 'http://127.0.0.1:3002/cocina';

        // Realiza la solicitud fetch para obtener datos de comidas
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener datos de comidas');
                }
                return response.json();
            })
            .then(data => {
                // Actualiza el estado con los datos obtenidos
                setMealsData(data);
            })
            .catch(error => {
                console.error('Error al realizar fetch:', error);
            });
    }, []);

  return (
    <div className="consumible">
      {mealsData.map((meal, index) => (
        <Card key={index} meal={meal} />
      ))}
    </div>
  );
}

export default comestibles_card;
