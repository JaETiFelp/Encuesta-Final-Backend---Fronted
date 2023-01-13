import React from 'react'
import Seccion from './Seccion'
const ListaSeccion = ({ secciones, setEditModalSeccion, setNameSeccionSt, setIdSeccion, setSeccionEf, setPreguntaEf }) => {
    return (
        <>
             <div className='w-1/2 ml-20'>
            <h1 className='text-center text-blue-900 pb-5 font-bold'> lista de Secciones </h1>
            <div className='container bg-blue-300 h-96 px-10 py-3 rounded-md overflow-y-scroll'>
               
               { secciones.map( (seccion ) =>   
                   <Seccion
                        seccion = { seccion }
                        setIdSeccion = { setIdSeccion }
                        setEditModalSeccion = { setEditModalSeccion }
                        setNameSeccionSt = { setNameSeccionSt }
                        setSeccionEf = { setSeccionEf }
                        setPreguntaEf = { setPreguntaEf }
                   />
               )}
            </div>
        </div>
        </>
    )
}

export default ListaSeccion
