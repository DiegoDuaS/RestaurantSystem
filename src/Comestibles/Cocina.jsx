import '/src/MainPage/Main.css'
import '/src/MainPage/nav.css'
import '/src/Restaurante/Box.css'
import './consumibles.css'
import HeaderMain from '/src/MainPage/Header'
import NavBar from '/src/MainPage/Nav'
import Cards from './comidas'


function Cocina() {

  return (
    <>
        <main class='main-content'>
          <HeaderMain></HeaderMain>
          <NavBar></NavBar>
          <section>
            <div class='cardbox'>
              <header class='headerbox'>Pedidos a trabajar</header>
              <Cards />
            </div>
          </section>
            
        </main>
    </>
  )
}

export default Cocina