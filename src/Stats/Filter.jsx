import './Filter.css';

function Filter({selectedOption, setSelectedOption, startDate, setStartDate, endDate, setEndDate} ) {

    // Renderiza la pantalla con el menú desplegable, los receptores de fechas y el espacio para datos
    return (
        <div className="data-screen">
            <p>Selecciona las fechas y la información a mostrar</p>

            <div className="input-group">
                <label htmlFor="dropdown">Menú desplegable:</label>
                <select id="dropdown" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                    <option value="">Seleccione una opción</option>
                    <option value="platos">Platos más pedidos</option>
                    <option value="horario"> Horario de más pedidos</option>
                    <option value="promedio">Promedio de tiempo de comida</option>
                    <option value="quejasPersona">Quejas por persona</option>
                    <option value="quejasPlatos">Quejas por plato</option>
                    <option value="eficiencia">Eficiencia de meseros (encuestas)</option>
                </select>
            </div>

            {/* Receptores de fechas */}
            <div className="input-group">
                <label htmlFor="start-date">Fecha de inicio:</label>
                <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label htmlFor="end-date">Fecha de fin:</label>
                <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
        </div>
    );
}

export default Filter;
