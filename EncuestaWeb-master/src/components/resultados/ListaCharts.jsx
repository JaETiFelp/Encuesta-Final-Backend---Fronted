import React from 'react'
import DoughnutChart from '../charts/DoughnutChart'
import PieChart from  '../charts/PieChart'
const ListaCharts = ({encuesta}) => {
    return (
        <>
            <div className='container w-1/2 py-10'>

            { encuesta !== undefined && encuesta !== null  && 
                (
                    encuesta.sections.map( (sec) => (

                        sec.questions.map( (pregunta ) => 
                              <PieChart/>
                        )    
                    )
                    )
                )
            }

            </div>            
            </>
    )
}

export default ListaCharts
