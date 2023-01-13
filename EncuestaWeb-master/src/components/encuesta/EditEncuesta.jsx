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
const EditEncuesta = ( {setEdit, editSt, setEditSt, setEncuestaEf}) => {

    const [error, setError] = useState(false)

    const changeEdit = (e) => {
        setEditSt({
            ...editSt,
            [e.target.name]: e.target.value
        })
    }

    const submitEncuestaEdit = (e) => {
        e.preventDefault();

        //validar
        if([editSt.nombre, editSt.descripcion, editSt.nro_veces, editSt.fecha_vigencia].includes('')){
            console.log('error')
            setError(true);
            return;
        } else
        {   
            
            axios({
                method: 'put',
                url: `https://encuestas-server-rest-api.herokuapp.com/api/v1/encuestas/${editSt.id}`,
                data: {
                    name: editSt.nombre,
                    description: editSt.descripcion,
                    nro_veces: editSt.nro_veces,
                    fecha_vigencia: editSt.fecha_vigencia
                }
              })
              .then( (res) =>{
               console.log(res)
               setEncuestaEf({editSt})
            }).catch( err =>{
                console.log(err);
                throw new Error(err);
            });
              setEdit(false)
        }
    }
    return (
        <>
        <Modall>
            <div className='text-right pr-3 pt-2 font-bold'>
                <button className='text-white'
                    onClick={ () => setEdit(false) }
                > X</button>
            </div>
            {error && <Alerta title={"Campos Vacios"}/>}
            <form className='text-center'
                 onSubmit={ submitEncuestaEdit }   
            >
                <div className='mt-10 '>
                    <input
                        type="text"
                        className='w-96 text-center py-1'
                        placeholder='Nombre'
                        value={editSt.nombre}
                        onChange={ changeEdit }
                        name='nombre'
                    />
                </div>
                <div className='my-7'>
                 
                    <textarea
                        type="text"
                        className='w-96 text-center py-1'
                        placeholder='Descripción'
                        value={ editSt.descripcion }
                        onChange={ changeEdit }
                        name='descripcion'
                    />
                </div>
                <div className='my-7'>
                    <input
                        type="number"
                        className='w-96 text-center py-1'
                        placeholder='Nro Veces'
                        value={ editSt.nro_veces}
                        onChange={ changeEdit }
                        name='nro_veces'
                    />
                </div>
                <div className='my-7'>
                    <input
                        type="date"
                        className='w-96 text-center text-black py-1'
                        placeholder='Fecha Vigencia'
                        value={ editSt.fecha_vigencia}
                        onChange={ changeEdit }
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

export default EditEncuesta
