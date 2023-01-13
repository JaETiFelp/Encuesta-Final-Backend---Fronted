import React from 'react'

const Alerta = ( {title} ) => {
    return (
        <div className="bg-red-400 w-1/2 text-center mx-auto text-red-900">
            <p> {title}</p>
        </div>
    )
}

export default Alerta
