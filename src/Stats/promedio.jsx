import React from 'react';
import './AllStats.css';

function PromedioComidas({ data }) {
    return (
        <div className="promedio-comidas">
            <h2>Promedio de tiempo que se tardan los clientes en comer</h2>
            <table>
                <thead>
                    <tr>
                        <th>Personas</th>
                        <th>Promedio</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.personas}</td>
                            <td>{row.promedio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PromedioComidas;
