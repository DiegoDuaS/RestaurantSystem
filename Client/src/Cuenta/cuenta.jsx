import React, { useState } from 'react';
import '/src/MainPage/Main.css'
import '/src/MainPage/nav.css'
import '/src/Mesas/Box.css'
import './cuenta.css'
import './factura.css'
import * as IoIcons from "react-icons/io"

function Cuenta({idmesa, setIsSelected, setIsClosed, setIdCuenta}){

    const pruebaComida = [
        {
            "id_comida": 1,
            "nombre": 'Salchichas',
            "descripcion": 'salchichas inglesas',
            "precio": 12.23
        },
        {
            "id_comida": 2,
            "nombre": 'Salchichas2',
            "descripcion": 'salchichas inglesas2',
            "precio": 12.23
        }  
    ]

    const handleClick = (event) => {
        setIsClosed(true);
        setIdCuenta('1')
    };

        
    return(
        <> 
                <button className='back' onClick={() => setIsSelected(false)}>
                    <IoIcons.IoMdArrowBack></IoIcons.IoMdArrowBack>
                </button>
                <div class= 'sectioncomida'>
                    <h3 class = 'tipopedido'>Platillos</h3>
                    <div class = 'platos'>
                        {pruebaComida.map((plato, index) => (
                            <p class = 'infromacioncomestible' key={index}>{plato.nombre} - {plato.descripcion} - ${plato.precio}</p>
                        ))}
                    </div>
                    <h3 class = 'tipopedido'>Bebidas</h3>
                    <div class = 'platos'>
                        {pruebaComida.map((plato, index) => (
                            <p class = 'infromacioncomestible' key={index}>{plato.nombre} - {plato.descripcion} - ${plato.precio}</p>
                        ))}
                    </div>
                </div>
                <div class = 'sectionpedido'>
                    <h2 class = 'title'>
                        Cuenta de Mesa #{idmesa}
                    </h2>
                    <div className='cuentabox'>
                    </div>
                    <button className = 'cuenta'> Mandar A Cocina</button>
                    <button className = 'cuenta' onClick = {() => handleClick()}> Cerrar Cuenta</button>
                    <div className='spaced'></div>
                </div>
        </>
    )

}

function FacturaPago({idcuenta, setIsSelected}){

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const [valorName, setValorName] = useState('');

    const handleChangeName = (event) => {
        setValorName(event.target.value);
    };

    const [valorAddress, setValorAddress] = useState('');

    const handleChangeAdress = (event) => {
        setValorAddress(event.target.value);
    };

    const [valorNIT, setValorNIT] = useState('');

    const handleChangeNIT = (event) => {
        setValorNIT(event.target.value);
    };

    const [valorPorcentaje, setValorPorcentaje] = useState('');

    const handleChangePorcentaje = (event) => {
        setValorNIT(event.target.value);
    };

    

    return(
        <>
            <div className='sectionpago'>
                <h2 className='pago'>Informacion Cliente</h2>
                <div className='sectiontipopago'>
                    <input className='infocliente' type="text" id="name" value={valorName} onChange={handleChangeName} placeholder="Nombre" required />
                    <input className='infocliente' type="text" id="address" value={valorAddress} onChange={handleChangeAdress} placeholder="Direccion" required />
                    <input className='infocliente' type="number" id="nit" value={valorNIT} onChange={handleChangeNIT} placeholder="NIT" required />
                    <button className='infocliente'> Aceptar </button>
                </div>
                <h2 className='pago'>Pago</h2>
                <div className='sectiontipopago'>
                    
                        <label htmlFor="dropdown">Tipo Pago</label>
                        <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
                            <option value="">Seleccione una opción</option>
                            <option value="Tarjeta">Tarjeta</option>
                            <option value="Efectivo">Efectivo</option>
                        </select>
                        <input className='infocliente' type="number" id="porcentaje" value={valorPorcentaje} onChange={handleChangePorcentaje} placeholder="Porcentaje" required />
                        <button className='infocliente'> Pagar </button>
                        <p> Saldo Restante: </p>
                    
                </div>
            </div>

            <div className='sectionfactura'>
                <div className='factura'>
                    
                </div>
            </div> 
        </>
    )
}

function TransaccionScreen({idmesa, setIsSelected}){

    const [isClosed, setIsClosed] = useState(false);
    const [idcuenta, setIdCuenta] = useState('0'); //EN LA BASE DE DATOS EL ID ESTA EN INT

    return(
        <>
            <div class='cardboxcuenta'>
                {!isClosed && <Cuenta idmesa={idmesa} setIsSelected={setIsSelected} setIsClosed={setIsClosed} setIdCuenta={setIdCuenta}></Cuenta>}
                {isClosed && <FacturaPago idcuenta={idcuenta} setIsSelected={setIsSelected}></FacturaPago>}
            </div>
        </>
    )
}

export default TransaccionScreen
