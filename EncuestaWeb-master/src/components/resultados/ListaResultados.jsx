import React, { useState, useEffect } from 'react'
import ListaCharts from './ListaCharts'
import ListaPreguntasR from './ListaPreguntasR'
import ListaPreguntasR2 from './ListaPreguntasR2'
import axios from 'axios'

const ListaResultados = ({encuesta, verTodo, idPreguntaSelect, setIdPreguntaSelect}) => {
    const [pregunta, setPregunta] = useState({})
    const [nombre, setNombre] = useState('')
    const [options, setOptions] = useState([])
    const [resultadoUnitario, setResultadoUnitario] = useState([])
    useEffect( () => {
        if (idPreguntaSelect !== ''){
            axios.get(`https://encuestas-server-rest-api.herokuapp.com/api/v1/preguntas/${idPreguntaSelect}`)
            .then( (res) => {
                // console.log(res.data)
                const o = res.data.pregunta;
                // console.log(o);
                setNombre(o.name)
                setOptions(o.optionRespuesta)
                // console.log(nombre)
                // console.log(options)
            })
        }
     
    },[idPreguntaSelect])

    useEffect( () => {
        if(idPreguntaSelect !== '' ){

            axios({
                method:'post',
                url: `https://encuestas-server-rest-api.herokuapp.com/api/v1/encuestaaplicadas/resultados`,
                data: {
                    id_encuesta: encuesta._id,
                    id_pregunta: idPreguntaSelect
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
        }
    },[nombre])
    return (
        <>
             <div className='container h-auto pr-24 py-3 rounded-md'>

                <div className='flex px-5'>
                    {
                        verTodo &&   
                        <ListaPreguntasR
                            encuesta={ encuesta }
                        />
                    }
                    {   !verTodo && nombre !== '' &&
                        <ListaPreguntasR2
                            idPreguntaSelect = { idPreguntaSelect } 
                            nombre = { nombre }
                            options = { options }
                            resultadoUnitario = { resultadoUnitario }
                        />
                    }

                </div>
            </div>            
        </>
    )
}

export default ListaResultados
