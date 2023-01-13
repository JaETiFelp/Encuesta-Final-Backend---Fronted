import React, { useState, useEffect} from 'react'
import axios from 'axios';
import Alerta from '../Alerta';

const FormularioPregunta = ({id, setPreguntaEf, seccionEf, secciones, setSecciones, pregunta, setPregunta}) => {

    const [tipoPreguntas, setTipoPreguntas] = useState([])

    const [error, setError] = useState(false)

    useEffect( () => {
        axios({
            method: 'get',
            url: `https://encuestas-server-rest-api.herokuapp.com/api/v1/seccions/${id}`,
          })
          .then( (res) =>{
           console.log(res.data.encuesta.sections)
            setSecciones(res.data.encuesta.sections)
        })
    }, [seccionEf])
    useEffect( () => {
        axios({
            method: 'get',
            url: `https://encuestas-server-rest-api.herokuapp.com/api/v1/tipopreguntas`,
          })
          .then( (res) =>{
           console.log(res.data.tipoPreguntas)
            setTipoPreguntas(res.data.tipoPreguntas)
        })
    }, [])
  
    const submitPregunta = (e) => {
        e.preventDefault();

        if([pregunta.nombre, pregunta.seccion, pregunta.tipoPregunta, pregunta.multiple].includes('')){
            setError(true);
            return;
        } else 
            setError(false)
        {
            let b = false;
            if(pregunta.multiple === "true"){
                b = true;
            }

            if(pregunta.id === ''){

                axios({
                    method: 'post',
                    url: `https://encuestas-server-rest-api.herokuapp.com/api/v1/preguntas/${pregunta.seccion}`,
                    data: {
                        name: pregunta.nombre,
                        tipoPregunta: pregunta.tipoPregunta,
                        multiple: b
                    }
                })
                .then( (res) =>{
                    console.log(res.data)
                if(res.data.success)
                setPreguntaEf({pregunta})
            }).catch( err =>{
                console.log(err);
                throw new Error(err);
            });
         } else 
         {
            axios({
                method: 'put',
                url: `https://encuestas-server-rest-api.herokuapp.com/api/v1/preguntas/${pregunta.id}`,
                data: {
                    name: pregunta.nombre,
                    tipoPregunta: pregunta.tipoPregunta,
                    multiple: b
                }
            })
            .then( (res) =>{
                console.log(res.data)
            if(res.data.success)
            setPreguntaEf({pregunta})
        }).catch( err =>{
            console.log(err);
            throw new Error(err);
        });
         }
            
            setPregunta({
                nombre: '',
                seccion: '',
                tipoPregunta: '',
                multiple: '',
                id: ''
            })
        }
        
    }

    const changePregunta = (e) => {
        setPregunta({
            ...pregunta,
            [e.target.name] : e.target.value
        })
    }
    return (
        <>
            <div className='w-1/3 ml-10' >
                <h1 className='text-center text-blue-900 font-bold pb-5'> Agregar Preguntas  </h1>
                
                <form className='bg-blue-300 pt-5 pb-10 px-7 rounded-md shadow-md'
                    onSubmit={ submitPregunta }
                >
                { error && <Alerta title={"Campos Vacios"}/>}
                    <div className='text-center py-3'> 
                        <textarea 
                        className='w-full rounded-md'
                        placeholder='pregunta'
                        type='text'
                        name='nombre'
                        value={pregunta.nombre}
                        onChange={ changePregunta }
                     />
                    </div>

                    <div className='text-center pb-3'> 
                        <select name="seccion" className='w-full'
                                onChange={ changePregunta }
                                value={pregunta.seccion}
                        >
                            <option value=""> Seccion </option>
                            
                            {
                                secciones.map( (seccion) =>
                                
                                <option value={seccion._id} > {seccion.name} </option>
                                )
                            }
                        </select>
                    </div>

                    <div className='text-center pb-3'> 
                        <select name="tipoPregunta" className='w-full'
                                onChange={ changePregunta }
                                value={ pregunta.tipoPregunta }
                        >
                            <option value=""> Tipo Pregunta </option>
                            
                            {
                                tipoPreguntas.map( (seccion) =>
                                
                                <option value={seccion._id} > {seccion.name} </option>
                                )
                            }
                        </select>
                    </div>
                    <div className='text-center pb-5'> 
                        <select name='multiple' className='w-full'
                                onChange={ changePregunta }
                                value={ pregunta.multiple }
                        >
                            <option value=""> Tipo de Seleccion </option>
                            <option value={true}> multiple </option>
                            <option value={false}> simple </option>
                        </select>
                    </div>
                    <div className='bg-blue-900 py-1 text-center text-white shadow-xl rounded-sm cursor-pointer'>
                        <input
                        className='cursor-pointer'
                            type="submit"
                            value= { pregunta.id === '' ? "Agregar Pregunta" : "Guardar Cambios"}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default FormularioPregunta
