import "./mesa.css"

function Mesa({ num, available, onClick }) {
    return (
        <>
            <li className={`cardmesa ${available ? 'disponiblec' : 'no-disponiblec'}`}>
                <h2 className='numesa'>
                    {num}
                </h2>
                <div className={`statemesa ${available ? 'disponibles' : 'no-disponibles'}`}>
                    {available ? 'Disponible' : 'No disponible'}
                </div>
            </li>
        </>
    );
}

export default Mesa