import "./mesa.css";
import React, { useState } from 'react';

function Mesa({ num, available, setIsSelected, mesaIdSelected, setIdMesaSelected }) {
    const handleCuenta = async () => {
        const userId = localStorage.getItem('id');
        try {
            const response = await fetch('http://127.0.0.1:3002/pedidos/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idMesa: mesaIdSelected,
                    propina: 1, // Puedes ajustar la propina según sea necesario
                    empleado: userId,
                    estado: true // Puedes ajustar el estado según sea necesario
                })
            });

            if (response.ok) {
                console.log("Cuenta creada exitosamente");
                // Puedes realizar acciones adicionales aquí si es necesario
            } else {
                console.error("Error al crear la cuenta:", response.statusText);
            }
        } catch (error) {
            console.error('Error al crear la cuenta:', error);
        }
    };

    const handleClick = () => {
        setIsSelected(true);
        setIdMesaSelected(num);
        handleCuenta();
    };

    return (
        <li key={num} className={`cardmesa ${available ? 'disponiblec' : 'no-disponiblec'}`} onClick={handleClick}>
            <h2 className='numesa'>{num}</h2>
            <div className={`statemesa ${available ? 'disponibles' : 'no-disponibles'}`}>{available ? 'Disponible' : 'No disponible'}</div>
        </li>
    );
}

export default Mesa;
