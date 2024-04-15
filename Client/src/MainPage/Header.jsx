import './Header.css'
import * as FaIcons from "react-icons/md"

function HeaderMain({id}){
    let iconStyles = { color: "white", fontSize: "2em" };

    return(
        <>
        <header class='main'>
            <div class = 'logo'>
                <FaIcons.MdOutlineFoodBank style={iconStyles}></FaIcons.MdOutlineFoodBank>
                <div class = 'restitle'> El Fogon Dorado </div>
            </div>
            <div class = 'user'> User Id: {id} </div>
        </header>
        </>
    )
}

export default HeaderMain