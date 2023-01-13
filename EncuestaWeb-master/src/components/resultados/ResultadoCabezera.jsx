import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ListaResultados from './ListaResultados'

const ResultadoCabezera = () => {
    const [encuestass, setEncuestas] = useState([])
    const [id, setIde] = useState('')
    const [encuesta, setEncuesta] = useState(null)
    const [verTodo, setVerTodo] = useState(false)
    //preguntaR
    const [idPreguntaSelect, setIdPreguntaSelect] = useState('') 
    // const [preguntaSelect, setPreguntaSelect] = useState([]);

    useEffect( ()=> {
        axios.get('https://encuestas-server-rest-api.herokuapp.com/api/v1/encuestas/w')
        .then( (res) => {
            // console.log(res.data)
            setEncuestas(res.data.encuestas)
            setIde(res.data.encuestas[0]._id)
        })
    },[])  

    useEffect( () => {
            axios.get(`https://encuestas-server-rest-api.herokuapp.com/api/v1/encuestas/web/${id}`)
            .then( (res) => {
                // console.log(res.data)
                setEncuesta(res.data.encuesta)
            })
    },[id])
    const changeEncuesta = (e)=>{
        const r = e.target.value
        setIde(r)
        console.log(id)
        // console.log(encuesta.name)
    }

    const changePregunta = (e) => {
        setIdPreguntaSelect(e.target.value)
        console.log(e.target.value)
    }
    return (
           <>
             <div className='bg-white my-5 mx-20 shadow-lg px-5 h-full uppercase'>
                <div className=' my-4 mx-4 pt-5 pb-1 flex justify-between relative'> 
                    <div className='container flex justify-evenly'> 
                        <select className='bg-blue-200 px-2 rounded-md font-bold text-blue-900 hover:bg-blue-400 text-center'
                            onChange={ changeEncuesta }
                        >       
                                <option className=''> Encuestas </option>
                                { encuestass.map( (encuestaa) => 

                                    <option
                                        value={encuestaa._id}
                                    > { encuestaa.name}</option>
                                )
                                }

                        </select>

                        <select className='bg-blue-200 px-2 rounded-md font-bold text-blue-900 hover:bg-blue-400 text-center'
                            onChange={ changePregunta }
                        > 
                        <option> Preguntas </option>
                        {   encuesta != null &&
                            (
                                encuesta.sections.map( (encu) => 
                                    encu.questions.map( (question) => 
                                        <option value={ question._id}> {question.name} </option>
                                    )
                                )
                            )
                        }

                         </select>

                         <select className='bg-blue-200 px-2 rounded-md font-bold text-blue-900 hover:bg-blue-400 text-center'
                         onChange={ (e) => e.target.value === 'true' ? setVerTodo(true) : setVerTodo(false)}
                        > 
                             <option value={false} > Ver por Separado</option>
                             <option value={true} > Ver todos </option>
                         </select>

                    </div>
                </div>
                    <hr color='blue'/>
                <ListaResultados
                    encuesta = { encuesta }
                    verTodo={ verTodo}
                    idPreguntaSelect = { idPreguntaSelect }
                    setIdPreguntaSelect = { setIdPreguntaSelect }
                />
            </div>
           </>
    )
}

export default ResultadoCabezera
