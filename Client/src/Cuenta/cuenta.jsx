import React, { useState, useEffect } from 'react';
import '/src/MainPage/Main.css'
import '/src/MainPage/nav.css'
import '/src/Mesas/Box.css'
import './cuenta.css'
import './factura.css'
import * as IoIcons from "react-icons/io"
import * as FaIcons from "react-icons/md"

function Cuenta({idmesa, setIsSelected, setIsClosed}){

    const idcuenta = localStorage.getItem('idcuenta');

    const [comidaData, setcomidaData] = useState(null);
    const [bebidaData, setbebidaData] = useState(null);
    const [pedidoData, setpedidoData] = useState(null);


    useEffect(() => {
      handleSubmitComida();
      handleSubmitBebida();
      handleSubmitCuenta();
  }, [idcuenta]);

  useEffect(() => {
    limpiarPedidoData();
  }, []); 

    const handleSubmitComida = async () => {
        try {
          const response = await fetch('http://127.0.0.1:3002/comida', {
            method: 'GET',
          });
    
          if (response.ok) {
            const data = await response.json();
            setcomidaData(data); 
          } else if (response.status === 401) {
            setErrorMessage("No se pudo llamar a la comida");
          } else {
            setErrorMessage("Error interno del servidor.");
          }
        } catch (error) {
          console.error('Error al llamar', error);
          setErrorMessage("Error al conectarse al servidor.");
        }
    };

    const handleSubmitBebida = async () => {
        try {
          const response = await fetch('http://127.0.0.1:3002/bebidas', {
            method: 'GET',
          });
    
          if (response.ok) {
            const data = await response.json();
            setbebidaData(data); 
          } else if (response.status === 401) {
            setErrorMessage("No se pudo llamar a la comida");
          } else {
            setErrorMessage("Error interno del servidor.");
          }
        } catch (error) {
          console.error('Error al llamar', error);
          setErrorMessage("Error al conectarse al servidor.");
        }
    };

    const handleSubmitCuenta = async () => { 
        try {
          const response = await fetch('http://127.0.0.1:3002/cuenta', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              pedido: idcuenta
            })
          });
      
          if (response.ok) {
            limpiarPedidoData();
            const data = await response.json();
            setpedidoData(data);
            console.log(pedidoData)
          } else if (response.status === 401) {
            setErrorMessage("No se pudo llamar a las mesas");
          } else {
            setErrorMessage("Error interno del servidor.");
          }
        } catch (error) {
          console.error('Error al llamar las mesas', error);
          setErrorMessage("Error al conectarse al servidor.");
        }
      };

    const handleSubmitAddComida = async (comidaId, pedidoId) => { 
        try {
          const response = await fetch('http://127.0.0.1:3002/recuento/comida', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              comida: comidaId,
              pedido: pedidoId
            })
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log(data);
          } else if (response.status === 401) {
            setErrorMessage("No se pudo llamar a las mesas");
          } else {
            setErrorMessage("Error interno del servidor.");
          }
        } catch (error) {
          console.error('Error al llamar las mesas', error);
          setErrorMessage("Error al conectarse al servidor.");
        }
    };

    const handleSubmitAddBebida = async (bebidaId, pedidoId) => { 
        try {
          const response = await fetch('http://127.0.0.1:3002/recuento/bebida', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              bebida: bebidaId,
              pedido: pedidoId
            })
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log(data);
          } else if (response.status === 401) {
            setErrorMessage("No se pudo llamar a las mesas");
          } else {
            setErrorMessage("Error interno del servidor.");
          }
        } catch (error) {
          console.error('Error al llamar las mesas', error);
          setErrorMessage("Error al conectarse al servidor.");
        }
    };


    const handleClick = (event) => {
        handleSubmitUpdateCuenta();
        setIsClosed('factura');
        limpiarPedidoData();
    };

    const handleClickComida = async (comidaId, pedidoId) => {
        try {
            await handleSubmitAddComida(comidaId, pedidoId); 
            handleSubmitCuenta();
        } catch (error) {
            console.error('Error al manejar la comida', error);
        }
    };

    const handleClickBebida = async (bebidaId, pedidoId ) => {
        try {
            await handleSubmitAddBebida(bebidaId, pedidoId); 
            handleSubmitCuenta();
        } catch (error) {
            console.error('Error al manejar la bebida', error);
        }
    };

    const handleSubmitUpdateCuenta = async (cuentaId) => { 
      try {
        const response = await fetch('http://127.0.0.1:3002/cuenta/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: idcuenta
          })
        });
        
        if (response.ok) {
          console.log('se cerro la cuenta correctamente');
        } else if (response.status === 401) {
          setErrorMessage("No se pudo llamar a las mesas");
        } else {
          setErrorMessage("Error interno del servidor.");
        }
      } catch (error) {
        console.error('Error al llamar las mesas', error);
        setErrorMessage("Error al conectarse al servidor.");
      }
  };

  const limpiarPedidoData = () => {
    setpedidoData([]);
  };
        
    return(
        <> 
                <div class= 'sectioncomida'>
                    <h3 class = 'tipopedido'>Platillos</h3>
                    <div class = 'platos'>
                        {comidaData && comidaData.map((plato, index) => (
                            <p class = 'infromacioncomestible' onClick={() => handleClickComida(plato.id_comida, idcuenta)}>{plato.nombre} - {plato.descripcion} - ${plato.precio}</p>
                        ))}
                    </div>
                    <h3 class = 'tipopedido'>Bebidas</h3>
                    <div class = 'platos'>
                        {bebidaData && bebidaData.map((plato, index) => (
                            <p class = 'infromacioncomestible' onClick={() => handleClickBebida(plato.id_bebida, idcuenta)} key = {index}>{plato.nombre} - {plato.descripcion} - ${plato.precio}</p>
                        ))}
                    </div>
                </div>
                <div class = 'sectionpedido'>
                    <h2 class = 'title'>
                        Cuenta de Mesa #{idmesa}
                    </h2>
                    <div className='cuentabox'>
                        {pedidoData && pedidoData.map((plato, index) => (
                            <p class = 'infromacioncomestible' key = {index}>{plato.productonombre} - {plato.cantidad} </p>
                        ))}
                    </div>
                    <button className = 'cuenta'> Mandar A Cocina</button>
                    <button className = 'cuenta' onClick = {() => handleClick()}> Cerrar Cuenta</button>
                    <div className='spaced'></div>
                </div>
        </>
    )

}

function FacturaPago({setIsSelected}){
    const idcuenta = localStorage.getItem('idcuenta');
    const [cuentaData, setcuentaData] = useState(null);
    const [pedidoData, setpedidoData] = useState(null);

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

    const[generateFactura, setGenerateFactura] = useState(false)

    const do_factura = async () => {    
      setGenerateFactura(true);
    };

    const handleSubmitCuenta = async () => { 
        try {
          const response = await fetch('http://127.0.0.1:3002/cuenta', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              pedido: idcuenta
            })
          });
      
          if (response.ok) {
            const data = await response.json();
            setcuentaData(data);
          } else if (response.status === 401) {
            setErrorMessage("No se pudo llamar a las mesas");
          } else {
            setErrorMessage("Error interno del servidor.");
          }
        } catch (error) {
          console.error('Error al llamar las mesas', error);
          setErrorMessage("Error al conectarse al servidor.");
        }
      };

    useEffect(() => {
        handleSubmitCuenta();
        handleSubmitPedido();
    }, []);

    const handleSubmitPedido = async () => { 
        try {
          const response = await fetch('http://127.0.0.1:3002/pedidos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              idPedido: idcuenta
            })
          });
      
          if (response.ok) {
            const data = await response.json();
            setpedidoData(data);
          } else if (response.status === 401) {
            setErrorMessage("No se pudo llamar a las mesas");
          } else {
            setErrorMessage("Error interno del servidor.");
          }
        } catch (error) {
          console.error('Error al llamar las mesas', error);
          setErrorMessage("Error al conectarse al servidor.");
        }
      };

    const handleClick = (event) => {
        setIsSelected(false);
        localStorage.setItem('idcuenta', null);
    };
    

    return(
        <>
            <div className='sectionpago'>
                <h2 className='pago'>Informacion Cliente</h2>
                <div className='sectiontipopago'>
                    <input className='infocliente' type="text" id="name" value={valorName} onChange={handleChangeName} placeholder="Nombre" required />
                    <input className='infocliente' type="text" id="address" value={valorAddress} onChange={handleChangeAdress} placeholder="Direccion" required />
                    <input className='infocliente' type="number" id="nit" value={valorNIT} onChange={handleChangeNIT} placeholder="NIT" required />
                    <button className='infocliente' onClick={do_factura}> Aceptar </button>
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
                  {!generateFactura && (
                      <div class='logofac'>
                          <FaIcons.MdOutlineFoodBank style={iconStyles}></FaIcons.MdOutlineFoodBank>
                          <div class='restitlefac'> El Fogon Dorado </div>
                      </div>
                  )}
                  {generateFactura && (
                        <>
                            <div className='sectiontipopago1' style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <p style={{ margin: 0 }}>Nombre: {valorName}</p>
                                <p style={{ margin: 0 }}>Dirección: {valorAddress}</p>
                                <p style={{ margin: 0 }}>NIT: {valorNIT}</p>
                            </div>
                            {cuentaData && cuentaData.map((plato, index) => (
                            <p class = 'infromacioncomestible' key = {index}>{plato.productonombre} - {plato.cantidad} - ${plato.preciounitario * plato.cantidad} </p>
                            ))}
                            <h2 className='total'> Total: ${pedidoData && pedidoData[0].total}</h2>
                        </>
                    )}
              </div>
              <button className='end' onClick={() => setIsSelected(false)}> Terminar Transacción</button>
          </div>

        </>
    )
}

function EncuestaQuejas({setIsSelected}){

}

function TransaccionScreen({idmesa, setIsSelected}){

    const [isClosed, setIsClosed] = useState('cuenta');

    return(
        <>
            <div class='cardboxcuenta'>
                {isClosed === 'cuenta' && <Cuenta idmesa={idmesa} setIsSelected={setIsSelected} setIsClosed={setIsClosed}></Cuenta>}
                {isClosed === 'factura' && <FacturaPago setIsSelected={setIsSelected}></FacturaPago>}
            </div>
        </>
    )
}

export default TransaccionScreen
