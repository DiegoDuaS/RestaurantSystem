import '../Mesas/Box.css'
import Areas from '../Mesas/Areas'
import Mesa from '../Mesas/mesa'
import Areasinfo from '../Mesas/areasinfo'
import React, { useState } from 'react'
import Mesas from '../Mesas/Mesas'
import Cuenta from '../Cuenta/cuenta'


function Restaurante() {

  const [isSelected, setIsSelected] = useState(false);

  return (
    <>
          <section>
            {isSelected === false && <Mesas isSelected={isSelected} setIsSelected={setIsSelected}/>}
            {isSelected === true && <Cuenta> </Cuenta>}
          </section>
    </>
  )
}

export default Restaurante