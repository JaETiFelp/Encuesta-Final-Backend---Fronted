import React, { useState, useEffect } from 'react'
import DoughnutChart from '../charts/DoughnutChart'
import axios from 'axios'
import PieChart from '../charts/PieChart'
const PreguntaR = ({pregunta, encuesta}) => {

    const [resultadoUnitario, setResultadoUnitario] = useState([])

    useEffect( ()=> {
        axios({
            method:'post',
            url: `https://encuestas-server-rest-api.herokuapp.com/api/v1/encuestaaplicadas/resultados`,
            data: {
                id_encuesta: encuesta._id,
                id_pregunta: pregunta._id
            }
        })
        .then( (res) =>{
            setResultadoUnitario(res.data.resultados)
            console.log(resultadoUnitario)
            console.log('hola')
        })
        .catch( (err) =>{
            console.log(err)
        })
    },[])

    return (
        <>
      <div className='bg-gray-200 shadow-xl rounded-md py-7 mb-10 ml-10'>
            <div className='bg-white py-2 mx-5 shadow-xl rounded-md mb-2'>
                <p className='text-center text-blue-500 font-bold uppercase'> ¿ { pregunta.name } ? </p>
            </div>
           <div className=' my-20 mx-10 h-96 w-full'>

               <div className='container flex'>
       
                <div className='w-1/2'> 
                        <PieChart
                            resultadoUnitario = { resultadoUnitario }
                        />
                </div>
                <div className='w-1/2 flex flex-col'> 
            {
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
        </>
    )
}

export default PreguntaR
