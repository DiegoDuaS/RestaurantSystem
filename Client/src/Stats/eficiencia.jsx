import React, { useState, useEffect } from 'react';
import './AllStats.css';


function EficienciaMeseros() {
    const [statsData, setStatsData] = useState([]);

    useEffect(() => {
        // Define la URL de tu servidor
        const url = 'http://127.0.0.1:3002/eficiencia_meseros1';

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
                setStatsData(data);
            })
            .catch(error => {
                console.error('Error al realizar fetch:', error);
            });
    }, []);

    return (
        <div className="eficiencia-meseros">
            <h2>Reporte de eficiencia de meseros</h2>
            <div className='box_stats1'>
                <div className='box_stats'>
                {statsData.map((dato, index) => (
                    <div key={index} >
                        <p>{dato.mesero}</p>
                        <p>mes: {dato.mes}</p>
                        <p>amabilidad: {dato.amabilidad}</p>
                        <p>exactitud: {dato.exactitud}</p>
                    </div>
                ))}
                </div>
            </div>
            
        </div>
    );
}

export default EficienciaMeseros;
