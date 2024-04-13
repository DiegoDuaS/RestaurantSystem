import React, { useState } from 'react';
import '/src/MainPage/Main.css'
import '/src/MainPage/nav.css'
import '/src/Mesas/Box.css'
import './cuenta.css'

function Cuenta(){
    
    return(
        <>
            <div class='cardboxcuenta'>
                <div class= 'sectioncomida'>
                    <h3 class = 'tipopedido'>Platillos</h3>
                    <div class = 'platos'></div>
                    <h3 class = 'tipopedido'>Bebidas</h3>
                    <div class = 'platos'></div>
                </div>
            </div>
        </>
    )

}

export default Cuenta 
