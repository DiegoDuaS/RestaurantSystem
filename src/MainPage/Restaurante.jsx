import './Main.css'
import './Section.css'
import './Box.css'
import HeaderMain from './Header'
import NavBar from './Nav'
import Areas from './Areas'


function Restaurante() {

  return (
    <>
        <main class='main-content'>
          <HeaderMain></HeaderMain>
          <NavBar></NavBar>
          <section>
            <div class='cardbox'>
              <header class='headerbox'>
                Mesas
              </header>
              <Areas></Areas>
            </div>
          </section>
            
        </main>
    </>
  )
}

export default Restaurante