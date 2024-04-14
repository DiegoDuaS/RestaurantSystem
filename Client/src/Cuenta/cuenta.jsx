import React, { useState } from 'react';
import '/src/MainPage/Main.css'
import '/src/MainPage/nav.css'
import '/src/Mesas/Box.css'
import './cuenta.css'
import * as IoIcons from "react-icons/io"

function Cuenta({idmesa, setIsSelected}){

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

    const pruebaCuenta = [
        {
            'id_pedido': 1,
            'mesa': 1,
            'total': 200,
            'propina': 20,
            'fecha': '20-2-20',
            'hora': '15:00',
            'empleado': 'user',
            'estado': true
        },
        {
            'id_pedido': 2,
            'mesa': 1,
            'total': 200,
            'propina': 20,
            'fecha': '20-2-20',
            'hora': '15:00',
            'empleado': 'user',
            'estado': false
        },
        {
            'id_pedido': 3,
            'mesa': 2,
            'total': 200,
            'propina': 20,
            'fecha': '20-2-20',
            'hora': '15:00',
            'empleado': 'user',
            'estado': true
        }
    ]

    const pruebaDatosCuenta = [
        {
            'pedido': 1,
            'bebida': null, 
            'comida': 1, 
        },
        {
            'pedido': 1,
            'bebida': null, 
            'comida': 2, 
        },
        {
            'pedido': 2,
            'bebida': null, 
            'comida': 2, 
        },
        {
            'pedido': 2,
            'bebida': null, 
            'comida': 1, 
        },
        {
            'pedido': 3,
            'bebida': null, 
            'comida': 1, 
        }

    ]

    function encontrarCuenta(mesaId) {
        for (const cuenta of pruebaCuenta) {
          if ((cuenta.mesa).toString() === mesaId) {
            if (cuenta.estado) {
              return cuenta.id_pedido;
            }
          }
        }
        return null;
      }

    const id = encontrarCuenta(idmesa)

        
    return(
        <>
            <div class='cardboxcuenta'>
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
                        {id}
                    </div>
                    <button className = 'cuenta'> Mandar A Cocina</button>
                    <button className = 'cuenta'> Cerrar Cuenta</button>
                    <div className='spaced'></div>
                </div>
            </div>
        </>
    )

}

export default Cuenta 
