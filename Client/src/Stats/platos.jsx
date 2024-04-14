import React from 'react';
import './AllStats.css';

function PlatosMasPedidos({ data }) {
    return (
        <div className="platos-mas-pedidos">
            <h2>Platos más pedidos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Comida</th>
                        <th>Bebida</th>
                        <th>Solicitados</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.comida}</td>
                            <td>{row.bebida}</td>
                            <td>{row.solicitados}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PlatosMasPedidos;
