import "./mesa.css"
import React, { useState } from 'react';


function Mesa({ num, available, setIsSelected, mesaIdSelected, setIdMesaSelected}) {

    const handleClick = (event) => {
        setIsSelected(true);
        setIdMesaSelected(num)
    };

    return (
        <>
            <li className={`cardmesa ${available ? 'disponiblec' : 'no-disponiblec'}`} onClick={() => handleClick()} >
                <h2 className='numesa'>
                    {num}
                </h2>
                <div className={`statemesa ${available ? 'disponibles' : 'no-disponibles'}`} onClick={() => handleClick()}>
                    {available ? 'Disponible' : 'No disponible'}
                </div>
            </li>
        </>
    );
}

export default Mesa