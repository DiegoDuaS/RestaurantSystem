import '../Mesas/Box.css'
import './consumibles.css'
import Cards from './comidas'


function Cocina() {
  return (
    <>
     <section className='main'>
            <div class='cardbox'>
              <header class='headerbox'>
                Pedidos a realizar
              </header>
              <Cards />
            </div>
            </section>
    </>
  )
}

export default Cocina