import '../Mesas/Box.css'
import './consumibles.css'
import Cards from './bebidas'


function Bar() {

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

export default Bar