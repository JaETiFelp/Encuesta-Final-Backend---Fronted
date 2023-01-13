import React from 'react'
import DoughnutChart from '../charts/DoughnutChart'
import PieChart from '../charts/PieChart'

const PreguntaR2 = ({nombre, options, resultadoUnitario }) => {
    
    return (
        <div>
      <div className='bg-gray-200 shadow-xl rounded-md py-7 mb-10 ml-10'>
            <div className='bg-white py-2 mx-5 shadow-xl rounded-md mb-2'>
                <p className='text-center text-blue-500 font-bold uppercase'> ¿ { nombre } ? </p>
            </div>
           <div className=' my-20 mx-10 h-96 w-full'>

               <div className='container flex'>
       
                <div className='w-1/2'> 
                        <PieChart
                            resultadoUnitario = { resultadoUnitario }
                        />
                </div>
                <div className='w-1/2 flex flex-col'> 
            { options !== null && options !== undefined &&
                resultadoUnitario.map( (opcion) =>
                <div className=' flex justify-between mx-32 text-stone-600'> 
                    <p className='font-medium'> {opcion.nombre} </p>
                    <p className='font-medium text-blue-500'>{opcion.cant}</p>
                </div>
                )
                
            }
                </div>
            </div>    
          
           </div>
        </div>            
        </div>
    )
}

export default PreguntaR2
