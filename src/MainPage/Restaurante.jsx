import './Main.css'
import './Section.css'
import './Box.css'
import HeaderMain from './Header'
import NavBar from './Nav'
import Areas from './Areas'
import Mesa from './mesa'


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
              <ul class='mesacontainer'>
                <Mesa num='01' available={true}></Mesa>
                <Mesa num='02' available={true}></Mesa>
                <Mesa num='03' available={false}></Mesa>
                <Mesa num='04' available={true}></Mesa>
                <Mesa num='05' available={false}></Mesa>
                <Mesa num='06' available={true}></Mesa>
                
              </ul>
            </div>
          </section>
            
        </main>
    </>
  )
}

export default Restaurante