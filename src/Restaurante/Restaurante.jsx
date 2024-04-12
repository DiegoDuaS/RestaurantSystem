import './Box.css'
import Areas from './Areas'
import Mesa from './mesa'
import Areasinfo from './areasinfo'
import React, { useState } from 'react';


function Restaurante() {

  return (
    <>
          <section>
            <div class='cardbox'>
              <header class='headerbox'>
                Mesas
              </header>
              <Areas></Areas>
              <ul class='mesacontainer'>
                <Mesa num='01' available={true}></Mesa>
                <Mesa num='02' available={true}></Mesa>
                <Mesa num='03' available={false}></Mesa>
                <Mesa num='04' available={true}></Mesa>
                <Mesa num='05' available={false}></Mesa>
                <Mesa num='06' available={true}></Mesa>
              </ul>
              <Areasinfo></Areasinfo>
            </div>
          </section>
    </>
  )
}

export default Restaurante