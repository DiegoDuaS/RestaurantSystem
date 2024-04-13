import "./mesa.css"
import React, { useState } from 'react';


function Mesa({ num, available, setIsSelected}) {

    return (
        <>
            <li className={`cardmesa ${available ? 'disponiblec' : 'no-disponiblec'}`} onClick={() => setIsSelected(true)}>
                <h2 className='numesa'>
                    {num}
                </h2>
                <div className={`statemesa ${available ? 'disponibles' : 'no-disponibles'}`} onClick={() => setIsSelected(true)}>
                    {available ? 'Disponible' : 'No disponible'}
                </div>
            </li>
        </>
    );
}

export default Mesa