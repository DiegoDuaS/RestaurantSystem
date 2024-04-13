import React from 'react'
import './Areas.css'

function Areasinfo({move,smoke}){
    return(
        <>
            <div class='areasinfo'>
                <h1 class='info'>
                    {move ? 'Las mesas se pueden mover' : 'Las mesas no se pueden mover'}
                </h1>
                <h1 class='info'>
                    {smoke ? 'El area es para fumadores' : 'El area no es para fumadores'}
                </h1>
            </div>
        </>
    )
}

export default Areasinfo