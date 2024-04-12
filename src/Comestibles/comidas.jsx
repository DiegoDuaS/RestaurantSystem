import React, { useState } from 'react';
import './consumibles.css';

function Card({ meal }) {
  const [isPrepared, setIsPrepared] = useState(false);
  const handleButtonClick = () => {
    setIsPrepared((prevIsPrepared) => !prevIsPrepared);
  };
  const cardClass = `card ${isPrepared ? 'prepared' : ''}`;

  return (
    <div className={cardClass}>
        <h2>{meal.name}</h2>
        <p>Mesa: {meal.table}</p>
        <p>Hora de solicitud: {meal.requestTime}</p>
        <button className="button" onClick={handleButtonClick}>Servido</button>
    </div>
  );

}

function comestibles_card() {
  const mealsData = [ //MODIFICAR OBTENCIÓN DE DATOS
    { name: "Hamburguesa", table: 5, requestTime: "12:00 PM" },
    { name: "Pizza", table: 8, requestTime: "12:30 PM" },
    { name: "Ensalada", table: 3, requestTime: "1:00 PM" },
  ];

  return (
    <div className="consumible">
      {mealsData.map((meal, index) => (
        <Card key={index} meal={meal} />
      ))}
    </div>
  );
}

export default comestibles_card;
