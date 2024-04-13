import React from 'react';
import './AllStats.css';

function QuejasPlatos({ data }) {
    return (
        <div className="quejas-platos">
            <h2>Reporte de quejas agrupadas por plato</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID Queja</th>
                        <th>Cliente</th>
                        <th>Comida</th>
                        <th>Bebida</th>
                        <th>Empleado</th>
                        <th>Trabajo</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Motivo</th>
                        <th>Clasificación</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.id_queja}</td>
                            <td>{row.cliente}</td>
                            <td>{row.comida}</td>
                            <td>{row.bebida}</td>
                            <td>{row.empleado}</td>
                            <td>{row.trabajo}</td>
                            <td>{row.fecha}</td>
                            <td>{row.hora}</td>
                            <td>{row.motivo}</td>
                            <td>{row.clasificacion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default QuejasPlatos;
