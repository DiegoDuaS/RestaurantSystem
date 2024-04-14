import React from 'react';
import './AllStats.css';

function EficienciaMeseros({ data }) {
    return (
        <div className="eficiencia-meseros">
            <h2>Reporte de eficiencia de meseros</h2>
            <table>
                <thead>
                    <tr>
                        <th>Mesero</th>
                        <th>Mes</th>
                        <th>Amabilidad</th>
                        <th>Exactitud</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.mesero}</td>
                            <td>{row.mes}</td>
                            <td>{row.amabilidad}</td>
                            <td>{row.exactitud}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EficienciaMeseros;
