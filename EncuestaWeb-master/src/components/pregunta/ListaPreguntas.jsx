import React from 'react'
import Pregunta from './Pregunta'

const ListaPreguntas = ( { seccions, setAddModalOR, setIdOR, preguntaF, setPregunta, setEditModalOR, setIdOREdit, setValue, setPreguntaEf }) => {
    return (
        <div className='w-1/2 ml-20 '>
            <h1 className='text-center text-blue-900 pb-5 font-bold'> lista de preguntas </h1>
            <div className='container bg-blue-300 h-96 px-10 py-3 rounded-md overflow-y-scroll'>
               
               { seccions.map( (seccion ) =>   
                    seccion.questions.map( (pregunta) => 
                        <Pregunta
                            key={pregunta._id}
                            pregunta = { pregunta }
                            setAddModalOR = { setAddModalOR }
                            setIdOR = { setIdOR }

                            seccion = { seccion }
                            //pregunta
                            preguntaF = { preguntaF }
                            setPregunta = { setPregunta }
                            setPreguntaEf = { setPreguntaEf }
                            //OR
                            setEditModalOR = { setEditModalOR }
                            setIdOREdit = { setIdOREdit }
                            setValue = { setValue }
                        />
                    )
               )}
            </div>
        </div>
    )
}

export default ListaPreguntas
