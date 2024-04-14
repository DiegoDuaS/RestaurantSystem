import React, { useState } from 'react';
import '/src/MainPage/Main.css'
import '/src/MainPage/nav.css'
import '/src/Mesas/Box.css'
import './cuenta.css'
import './factura.css'
import * as IoIcons from "react-icons/io"
import * as FaIcons from "react-icons/md"

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

    const[generateFactura, setGenerateFactura] = useState(false)

    let iconStyles = { color: "black", fontSize: "6em" };

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
        setValorPorcentaje(event.target.value);
    };

    return(
        <>
            <div className='sectionpago'>
                <h2 className='pago'>Informacion Cliente</h2>
                <div className='sectiontipopago'>
                    <input className='infocliente' type="text" id="name" value={valorName} onChange={handleChangeName} placeholder="Nombre" required />
                    <input className='infocliente' type="text" id="address" value={valorAddress} onChange={handleChangeAdress} placeholder="Direccion" required />
                    <input className='infocliente' type="number" id="nit" value={valorNIT} onChange={handleChangeNIT} placeholder="NIT" required />
                    <button className='infocliente' onClick={() => setGenerateFactura(true)}> Aceptar </button>
                </div>
                <h2 className='pago'>Pago</h2>
                <div className='sectiontipopago'>
                        <p className='pago'> Saldo Restante: </p>
                        <select className='pago' id="dropdown" value={selectedOption} onChange={handleOptionChange}>
                            <option value="">Tipo pago</option>
                            <option value="Tarjeta">Tarjeta</option>
                            <option value="Efectivo">Efectivo</option>
                        </select>
                        <input className='infocliente' type="number" id="porcentaje" value={valorPorcentaje} onChange={handleChangePorcentaje} placeholder="Porcentaje a pagar" required />
                        <button className='infocliente'> Pagar </button>
                </div>
            </div>

            <div className='sectionfactura'>
                <div className='factura'>
                    {!generateFactura && <div class = 'logofac'>
                    <FaIcons.MdOutlineFoodBank style={iconStyles}></FaIcons.MdOutlineFoodBank>
                    <div class = 'restitlefac'> El Fogon Dorado </div>
                    </div>}
                    {generateFactura && <> </>}
                </div>
                <button className='end' onClick={() => setIsSelected(false)}> Terminar Transaccion</button>
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
