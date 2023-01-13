import React from 'react'
import {Link } from 'react-router-dom'
const Navegacion = () => {
    return (
        <div>
            <nav className=' bg-blue-900 flex justify-stard py-4 text-white'>
                <div className='mx-5 cursor-pointer hover:text-black'>
                    <Link to="/" > Home </Link>
                </div>
                <div className='mr-5 cursor-pointer hover:text-black'>                    
                    <Link to="/encuestas"> Encuestas </Link>
                </div>
                <div className='mr-5 cursor-pointer hover:text-black'>
                    <Link to="/resultados"> Resultados</Link>
                </div>
            </nav>
        </div>
    )
}

export default Navegacion
