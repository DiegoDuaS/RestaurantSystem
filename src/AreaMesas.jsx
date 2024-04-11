import './Header.css'
import './Main.css'
import './Section.css'
import * as FaIcons from "react-icons/fa"

function AreaMesas() {

  return (
    <>
        <main class='main-content'>
          <header class='main'>
            <div class = 'restitle'> Titulo Restaurante </div>
            <div class = 'user'> User </div>
          </header>
          <nav>
            <ul>
                <li><a href="#" class='nava'> Restaurante</a></li>
                <li><a href="#" class='nava'> Cocina</a></li>
                <li><a href="#" class='nava'> Bar</a></li>
                <li><a href="#" class='nava'> Estadisticas</a></li>
            </ul>
          </nav>
            
        </main>
    </>
  )
}

export default AreaMesas