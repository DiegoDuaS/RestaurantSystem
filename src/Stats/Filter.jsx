import React, { useState } from 'react';
import './Filter.css';
/**
import Platos from './platos'
import Horario from './horarios'
import QuejasPersona from './quejasPersona'
import QuejasPlatos from './quejasPlatos'
import Promedio from './promedio'
import Eficiencia from './eficiencia'
 */

function DataScreen() {
    // Estados para manejar las selecciones del menú desplegable y los receptores de fechas
    const [selectedOption, setSelectedOption] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Funciones para manejar los cambios de valores
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    // Renderiza la pantalla con el menú desplegable, los receptores de fechas y el espacio para datos
    return (
        <div className="data-screen">
            <p>Selecciona las fechas y la información a mostrar</p>

            {/* Menú desplegable */}
            <div className="input-group">
                <label htmlFor="dropdown">Menú desplegable:</label>
                <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
                    <option value="">Seleccione una opción</option>
                    <option value="Platos">Platos más pedidos</option>
                    <option value="Horarios">Horario de más pedidos</option>
                    <option value="Promedio">Promedio de tiempo de comida </option>
                    <option value="QuejasPersona">Quejas por persona</option>
                    <option value="QuejasPlatos">Quejas por plato</option>
                    <option value="Eficiencia">Eficiencia de meseros (encuestas)</option>
                </select>
            </div>

            {/* Receptores de fechas */}
            <div className="input-group">
                <label htmlFor="start-date">Fecha de inicio:</label>
                <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={handleStartDateChange}
                />
            </div>

            <div className="input-group">
                <label htmlFor="end-date">Fecha de fin:</label>
                <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={handleEndDateChange}
                />
            </div>
        </div>
    );
}

export default DataScreen;
