import React from 'react'
import PreguntaR from './PreguntaR'
const ListaPreguntasR = ({encuesta}) => {
    return (
        <>
            <div className='w-full mr-10'>
            { encuesta !== undefined && encuesta !== null  && 
                (
                    encuesta.sections.map( (sec) => (

                        sec.questions.map( (pregunta ) => 
                            <PreguntaR
                                pregunta={ pregunta }
                                encuesta = { encuesta }
                            />
                        )    
                    )
                    )
                )
            }
            </div>           
        </>
    )
}

export default ListaPreguntasR
