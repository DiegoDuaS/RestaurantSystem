import React, { useState, useEffect } from 'react';
import '/src/MainPage/Main.css'
import '/src/MainPage/nav.css'
import '/src/Mesas/Box.css'
import './cuenta.css'
import './factura.css'
import './encuestaqueja.css'
import * as IoIcons from "react-icons/io"
import * as FaIcons from "react-icons/md"

function Cuenta({idmesa, setIsClosed}){

    const idcuenta = localStorage.getItem('idcuenta');


    const [comidaData, setcomidaData] = useState(null);
    const [bebidaData, setbebidaData] = useState(null);
    const [pedidoData, setpedidoData] = useState(null);
    const [errorMessage11, setErrorMessage] = useState("");



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
                    <button className = 'cuenta' onClick = {() => handleClick()}> Cerrar Cuenta</button>
                    <div className='spaced'></div>
                </div>
        </>
    )

}

function FacturaPago({setIsClosed}){
    const idcuenta = localStorage.getItem('idcuenta');
    const [cuentaData, setcuentaData] = useState(null);
    const [pedidoData, setpedidoData] = useState(null);
    const [clienteData, setclienteData] = useState(null);

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

      const handleSubmitCliente = async (nit1,nombre1,direccion1) => { 
        try {
          const response = await fetch('http://127.0.0.1:3002/cliente', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nit: nit1,
              nombre: nombre1,
              direccion: direccion1
            })
          });
      
          if (response.ok) {
            const data = await response.json();
            setclienteData(data);
            localStorage.setItem('idcliente', data[0].id_cliente);
          } else if (response.status === 401) {
            setErrorMessage("No se pudo llamar al cliente");
          } else {
            setErrorMessage("Error interno del servidor.");
          }
        } catch (error) {
          console.error('Error al llamar al cliente', error);
          setErrorMessage("Error al conectarse al servidor.");
        }
      };

      const handleSubmitFactura = async () => { 
        try {
          const response = await fetch('http://127.0.0.1:3002/factura', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cliente: localStorage.getItem('idcliente'),
              pedido: localStorage.getItem('idcuenta')
            })
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log("Se envio correctamente la factura")
            localStorage.setItem('idfactura', data[0].id_factura);
          } else if (response.status === 401) {
            setErrorMessage("No se pudo llamar a las mesas");
          } else {
            setErrorMessage("Error interno del servidor.");
          }
        } catch (error) {
          console.error('Error al llamar la factura', error);
          setErrorMessage("Error al conectarse al servidor.");
        }
      };

      const handleSubmitPago = async (tipo, fraccion) => { 
        try {
          const response = await fetch('http://127.0.0.1:3002/pago', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              factura: localStorage.getItem('idfactura'),
              tipo: tipo,
              fraccion: fraccion
            })
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log("Se envio correctamente el pago")
          } else if (response.status === 401) {
            setErrorMessage("No se pudo llamar al pago");
          } else {
            setErrorMessage("Error interno del servidor.");
          }
        } catch (error) {
          console.error('Error al llamar el pago', error);
          setErrorMessage("Error al conectarse al servidor.");
        }
      };
    

    return(
        <>
            <div className='sectionpago'>
                <h2 className='pago'>Informacion Cliente</h2>
                <div className='sectiontipopago'>
                    <input className='infocliente' type="text" id="name" value={valorName} onChange={handleChangeName} placeholder="Nombre" required />
                    <input className='infocliente' type="text" id="address" value={valorAddress} onChange={handleChangeAdress} placeholder="Direccion" required />
                    <input className='infocliente' type="number" id="nit" value={valorNIT} onChange={handleChangeNIT} placeholder="NIT" required />
                    <button className='infocliente' onClick={() => {handleSubmitCliente(parseInt(valorNIT), valorName, valorAddress)}}>Aceptar</button>
                </div>
                <h2 className='pago'>Pago</h2>
                <div className='sectiontipopago'>
                        <select className='pago' id="dropdown" value={selectedOption} onChange={handleOptionChange}>
                            <option value="">Tipo pago</option>
                            <option value="Tarjeta">Tarjeta</option>
                            <option value="Efectivo">Efectivo</option>
                        </select>
                        <input className='infocliente' type="number" id="porcentaje" value={valorPorcentaje} onChange={handleChangePorcentaje} placeholder="Porcentaje a pagar" required />
                        <button className='infocliente' onClick={() => handleSubmitPago(selectedOption, valorPorcentaje)}> Pagar </button>
                </div>
            </div>

            <div className='sectionfactura'>
              <div className='factura'>
                  {!generateFactura && (
                      <div class='logofac'>
                          <FaIcons.MdOutlineFoodBank style={iconStyles}></FaIcons.MdOutlineFoodBank>
                          <div class='restitlefac'> El Fogon Dorado </div>
                          <button className='generatefactura' onClick={() => {handleSubmitFactura(); setGenerateFactura(true);}}>Generar Factura</button>
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
              <button className='end' onClick={() => setIsClosed('encuesta')}> Terminar Transacción</button>
          </div>

        </>
    )
}

function EncuestaQuejas({setIsSelected}){

    const [valorExactitud, setValorExactitud] = useState('');

    const handleChangeExactiud = (event) => {
        setValorExactitud(event.target.value);
    };

    const [valorAmabilidad, setValorAmabilidad] = useState('');

    const handleChangeAmabilidad = (event) => {
        setValorAmabilidad(event.target.value);
    };

    const [valorEmpleado, setValorEmpleado] = useState('');

    const handleChangeEmpleado = (event) => {
        setValorEmpleado(event.target.value);
    };

    const [valorBebida, setValorBebida] = useState('');

    const handleChangeBebida = (event) => {
        setValorBebida(event.target.value);
    };

    const [valorComida, setValorComida] = useState('');

    const handleChangeComida = (event) => {
        setValorComida(event.target.value);
    };

    const [valorQueja, setValorQueja] = useState('');

    const handleChangeQueja = (event) => {
        setValorQueja(event.target.value);
    };

    const [valorClasification, setValorClasification] = useState('');

    const handleChangeClasification = (event) => {
        setValorClasification(event.target.value);
    };

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const idcliente = localStorage.getItem('idcliente');
    const id_empleado = localStorage.getItem('id');

    const handleSubmit = async (e) => {
      let empleado = valorEmpleado;
      let comida = valorComida;
      let bebida = valorBebida;
    
      // Verifica si los valores están vacíos y asígnalos a null
      if (valorEmpleado === '') {
        empleado = null;
      }
      if (valorComida === '') {
        comida = null;
      }
      if (valorBebida === '') {
        bebida = null;
      }
      e.preventDefault();
      try {
        const response = await fetch('http://127.0.0.1:3002/queja', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cliente: idcliente, 
            empleado:empleado, 
            comida: comida, 
            bebida: bebida, 
            motivo: valorQueja, 
            clasificacion: valorClasification
          })
        });
  
        if (response.ok) {
          const data = await response.json();
           // Limpiar los datos después de enviar la queja
            setValorEmpleado('');
            setValorComida('');
            setValorBebida('');
            setValorQueja('');
            setValorClasification('');
            setSelectedOption('');
            console.log('Se logro la queja')

        } else if (response.status === 401) {
          setErrorMessage("Nombre de usuario o contraseña incorrectos.");
        } else {
          setErrorMessage("Error interno del servidor.");
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        setErrorMessage("Error al conectarse al servidor.");
      }
    };

    const handleSubmit_enceusta = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://127.0.0.1:3002/encuesta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cliente: idcliente, 
            empleado: id_empleado, 
            amabilidad: valorAmabilidad, //valorEmpleado 
            exactitud: valorExactitud, //valorEmpleado
          })
        });
  
        if (response.ok) {
          const data = await response.json();
           // Limpiar los datos después de enviar la queja
           setValorAmabilidad('');
           setValorExactitud('');
           setSelectedOption('');
           console.log('Se logro la encuesta')
        } else if (response.status === 401) {
          setErrorMessage("Nombre de usuario o contraseña incorrectos.");
        } else {
          setErrorMessage("Error interno del servidor.");
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        setErrorMessage("Error al conectarse al servidor.");
      }
    };

  

    return(
      <>
      <header class='headerboxencuesta'>
        <h3 className='hcuenta'>
          Gracias por su compra
        </h3>
        <p class='pcuenta'>
          ¡Porfavor dejanos tu opinion para poder mejorar!
        </p>
      </header>
      <div className='sectionencuesta'>
        <div className='sectionencuestaqueja'>
          <div className='encuestaqueja'> 
            <h2 className='encuesta2'>Encuesta</h2>
            <h3 className='encuesta3'> Deja tu opinion de tu mesero del 1 al 5 <br /> (1 malo y 5 exelente) </h3>
            <p> Exactitud </p>
            <input className='infocliente' type="number" id="exactitud" value={valorExactitud} onChange={handleChangeExactiud} placeholder="Que tan exacto fue su pedido" required />
            <p> Amabilidad </p>
            <input className='infocliente' type="number" id="amabilidad" value={valorAmabilidad} onChange={handleChangeAmabilidad} placeholder="Que tan amable fue su mesero" required />
            <div className='sectionbuton1'>
            <button className='encuestabuton' onClick={handleSubmit_enceusta}>Enviar</button>
            </div>
          </div>
          <div className='encuestaqueja'> 
            <h2 className='encuesta2'>Queja</h2>
            <h3 className='encuesta3'> ¿Problemas con el staff o la comida?</h3>
              <select className='pago' id="dropdown" value={selectedOption} onChange={handleOptionChange}>
                <option value="">Queja a:</option>
                <option value="empleado">Staff</option>
                <option value="comida">Comida</option>
                <option value="bebida">Bebida</option>
              </select>
              {selectedOption === 'empleado' &&
               <>
               <p> Id Empleado </p>
               <input className='infocliente' type="number" id="empleado" value={valorEmpleado} onChange={handleChangeEmpleado} placeholder="Pide el Id del empleado" required />
               </>
              }
              {selectedOption === 'comida' &&
               <>
               <p> Id Comida </p>
               <input className='infocliente' type="number" id="comida" value={valorComida} onChange={handleChangeComida} placeholder="Puedes encontrar el Id en el menú" required />
               </>
              }
              {selectedOption === 'bebida' &&
               <>
               <p> Id Bebida </p>
               <input className='infocliente' type="number" id="bebida" value={valorBebida} onChange={handleChangeBebida} placeholder="Puedes encontrar el Id en el menú" required />
               </>
              }
              {selectedOption !== '' &&
              <>
               <p> Explicanos porque </p>
               <input className='infoqueja' type="text" id="queja" value={valorQueja} onChange={handleChangeQueja} required />
               <p> Que tan mala fue tu experiencia: </p>
               <input className='infocliente' type="number" id="clasification" value={valorClasification} onChange={handleChangeClasification} placeholder="(1 no tan Mala - 5 Horrible)" required />
               <div className='sectionbuton1'>
                  <button className='encuestabuton' onClick={handleSubmit}>Enviar</button>
              </div>
               </>
              }
          </div>
        </div>
        <div className='sectionbuton'>
          <button className='encuestabuton' onClick={() => setIsSelected(false)}>Salir</button>
        </div>
      </div>


        
      </>
    )
}

function TransaccionScreen({idmesa, setIsSelected}){

    const [isClosed, setIsClosed] = useState('cuenta');

    return(
        <>
            <div className={isClosed === 'encuesta' ? 'cardbox' : 'cardboxcuenta'}>
                {isClosed === 'cuenta' && <Cuenta idmesa={idmesa} setIsClosed={setIsClosed}></Cuenta>}
                {isClosed === 'factura' && <FacturaPago setIsClosed={setIsClosed}></FacturaPago>}
                {isClosed === 'encuesta' && <EncuestaQuejas setIsSelected={setIsSelected}></EncuestaQuejas>}
            </div>
        </>
    )
}

export default TransaccionScreen
