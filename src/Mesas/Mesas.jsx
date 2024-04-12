import './Box.css'
import Areas from '../Mesas/Areas'
import Mesa from '../Mesas/mesa'
import Areasinfo from '../Mesas/areasinfo'
import React, { useState } from 'react';

function Mesas({isSelected, setIsSelected}){
    return(
        <>
            <div class='cardbox'>
              <header class='headerbox'>
                Mesas
              </header>
              <Areas></Areas>
              <ul class='mesacontainer'>
                <Mesa num='01' available={true} setIsSelected={setIsSelected}></Mesa>
                <Mesa num='02' available={true} setIsSelected={setIsSelected}></Mesa>
                <Mesa num='03' available={false} setIsSelected={setIsSelected}></Mesa>
                <Mesa num='04' available={true} setIsSelected={setIsSelected}></Mesa>
                <Mesa num='05' available={false} setIsSelected={setIsSelected}></Mesa>
                <Mesa num='06' available={true} setIsSelected={setIsSelected}></Mesa>
              </ul>
              <Areasinfo></Areasinfo>
            </div>
        </>
    )
}

export default Mesas