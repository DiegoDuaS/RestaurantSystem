import '../Mesas/Box.css'
import Areas from '../Mesas/Areas'
import Mesa from '../Mesas/mesa'
import Areasinfo from '../Mesas/areasinfo'
import React, { useState } from 'react'
import Mesas from '../Mesas/Mesas'
import TransaccionScreen from '../Cuenta/cuenta'


function Restaurante() {

  const [isSelected, setIsSelected] = useState(false);
  const [mesaIdSelected, setIdMesaSelected] = useState('0');

  const handleSelectMesa = (mesaId) => {
    setIsSelected(true);
    setIdMesaSelected(mesaId);
  };

  return (
    <>
      <section>
        {!isSelected && <Mesas setIsSelected={setIsSelected} mesaIdSelected={mesaIdSelected} onSelectMesa={handleSelectMesa} />}
        {isSelected && <TransaccionScreen idmesa={mesaIdSelected} setIsSelected={setIsSelected}/>}
      </section>
    </>
  );
}

export default Restaurante