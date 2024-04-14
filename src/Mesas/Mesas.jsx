import './Box.css'
import Areas from '../Mesas/Areas'
import Mesa from '../Mesas/mesa'
import Areasinfo from '../Mesas/areasinfo'
import React, { useState } from 'react';

function Mesas({ setIsSelected, mesaIdSelected, onSelectMesa }) { 
  return (
    <>
      <div class='cardbox'>
        <header class='headerbox'>
          Mesas
        </header>
        <Areas></Areas>
        <ul class='mesacontainer'>
          <Mesa num='1' available={true} setIsSelected={setIsSelected} mesaIdSelected={mesaIdSelected} setIdMesaSelected={onSelectMesa}></Mesa>
          <Mesa num='2' available={true} setIsSelected={setIsSelected} mesaIdSelected={mesaIdSelected} setIdMesaSelected={onSelectMesa}></Mesa>
        </ul>
        <Areasinfo></Areasinfo>
      </div>
    </>
  );
}


export default Mesas