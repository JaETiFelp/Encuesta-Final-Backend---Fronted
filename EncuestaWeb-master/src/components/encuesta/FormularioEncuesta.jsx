import React, {useState} from 'react'
import styled from '@emotion/styled'
import Alerta from '../Alerta'
import axios from 'axios'
const Modall = styled.div`
position: relative;
background-color: gray;
opacity: 1;
width: 10rem;
margin: 5rem auto;
width: 40%;
height: 29rem;
`
const FormularioEncuesta = ({ setModal, setEncuestaEf}) => {
    
    const [encuesta, setEncuesta] = useState({
        nombre: '',
        descripcion: '',
        nro_veces: '',
        fecha_vigencia: '',
    });


    const [error, setError] = useState(false);

    const changeEncuesta = (e) => {
        setEncuesta({
            ...encuesta,
            [e.target.name]: e.target.value
        })
    }
    const submitEncuesta = (e) => {
        e.preventDefault();

        //validar
        if([encuesta.nombre, encuesta.descripcion, encuesta.nro_veces, encuesta.fecha_vigencia].includes('')){
            console.log('error')
            setError(true);
            return;
        } else
        {   
            
            axios({
                method: 'post',
                url: 'https://encuestas-server-rest-api.herokuapp.com/api/v1/encuestas',
                data: {
                    name: encuesta.nombre,
                    description: encuesta.descripcion,
                    nro_veces: encuesta.nro_veces,
                    fecha_vigencia: encuesta.fecha_vigencia
                }
              })
              .then( (res) =>{
               console.log(res)
               setEncuestaEf({encuesta})

            }).catch( err =>{
                console.log(err);
                throw new Error(err);
            });
              setModal(false)
        }
    }

    return (
        <>
             <Modall>
            <div className='text-right pr-3 pt-2 font-bold'>
                <button className='text-white'
                    onClick={ () => setModal(false) }
                > X</button>
            </div>
            {error && <Alerta title={"Campos Vacios"}/>}
            <form className='text-center'
                    onSubmit={ submitEncuesta }
            >
                <div className='mt-10 '>
                    <input
                        type="text"
                        className='w-96 text-center py-1'
                        placeholder='Nombre'
                        onChange={ changeEncuesta }
                        name='nombre'
                    />
                </div>
                <div className='my-7'>
                 
                    <textarea
                        type="text"
                        className='w-96 text-center py-1'
                        placeholder='Descripción'
                        onChange={ changeEncuesta }
                        name='descripcion'
                    />
                </div>
                <div className='my-7'>
                    <input
                        type="number"
                        className='w-96 text-center py-1'
                        placeholder='Nro Veces'
                        onChange={ changeEncuesta }
                        name='nro_veces'
                    />
                </div>
                <div className='my-7'>
                    <input
                        type="date"
                        className='w-96 text-center text-black py-1'
                        placeholder='Fecha Vigencia'
                        onChange={ changeEncuesta }
                        name='fecha_vigencia'
                    />
                </div>
                <div className=''>
                    <input
                        className='bg-blue-500 w-96 py-1 rounded-md shadow-lg text-white cursor-pointer'
                        type="submit"
                        value="Guardar"
                    />
                </div>
              
            </form>
        </Modall>
        </>
    )
}

export default FormularioEncuesta
