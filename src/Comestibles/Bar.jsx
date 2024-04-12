import '/src/MainPage/Main.css'
import '/src/MainPage/Section.css'
import '/src/MainPage/Box.css'
import './consumibles.css'
import HeaderMain from '/src/MainPage/Header'
import NavBar from '/src/MainPage/Nav'
import Cards from './bebidas'


function Bar() {

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

export default Bar