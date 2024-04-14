import React from 'react';
import './AllStats.css';

function HorariosPedidos({ data }) {
    return (
        <div className="horarios-pedidos">
            <h2>Horarios con más pedidos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Hora</th>
                        <th>Pedidos</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.hora}</td>
                            <td>{row.pedidos}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HorariosPedidos;
