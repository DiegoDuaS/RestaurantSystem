import '/src/Restaurante/Box.css'
import './consumibles.css'
import Cards from './comidas'


function Cocina() {

  return (
    <>
        <section>
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