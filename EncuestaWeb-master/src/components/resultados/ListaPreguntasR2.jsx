import React from 'react'
import PreguntaR2 from './PreguntaR2'

const ListaPreguntasR2 = ({idPreguntaSelect, nombre, options, resultadoUnitario}) => {
    return (
        <>
        <div className='w-full mr-10'>
            <PreguntaR2
                nombre={ nombre }
                options={ options }
                resultadoUnitario = { resultadoUnitario }
            />
        </div>
        </>
    )
}

export default ListaPreguntasR2
