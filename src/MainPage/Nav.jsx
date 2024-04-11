import './Section.css'
import * as FaIcons from "react-icons/fa"

function NavBar(){

let iconStyles = { color: "black", fontSize: "1.3em" };

    return (
        <>
        <nav>
            <ul class='nav'>
                <li class='nav'><a href="#" class='nava'> Restaurante</a></li>
                <li class='nav'><a href="#" class='nava'> Cocina</a></li>
                <li class='nav'><a href="#" class='nava'> Bar</a></li>
                <li class='nav'><a href="#" class='nava'> Estadisticas</a></li>
                <div class = 'space'></div>
                <li class='signout'><FaIcons.FaSignOutAlt style={iconStyles}></FaIcons.FaSignOutAlt><a href="#" class='nava'>Sign Out</a></li>
            </ul>
        </nav>
        </>
    )
}

export default NavBar