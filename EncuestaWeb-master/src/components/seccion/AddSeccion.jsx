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
height: 15rem;
`
const AddSeccion = ({setModalSeccion, id, setSeccionEf}) => {

    const [error, setError] = useState(false)
    const [name, setName] = useState('')

    const submitSeccion = (e) => {
        e.preventDefault();

        if([name].includes('')){
            console.log('error')
            setError(true)
            return;
        } else 
        {
            axios({
                method: 'post',
                url: `https://encuestas-server-rest-api.herokuapp.com/api/v1/seccions/${id}`,
                data: { name }
            })
            .then( res => {
                console.log(res);
                setSeccionEf(Math.random())
            })
            .catch( err =>{
                console.log(err);
                throw new Error(err);
            });
            setModalSeccion(false)
        }

    }
    return (
        <>
        <Modall>
            <div className='text-right pr-3 pt-2 font-bold'>
                <button className='text-white'
                    onClick={ () => setModalSeccion(false) }
                > X</button>
            </div>
            {error && <Alerta title={"Campos Vacios"}/>}
            <form className='text-center'  
                onSubmit={ submitSeccion }
            >
                <div className='my-10'>
                    <input
                        type="text"
                        className='w-96 text-center py-1'
                        placeholder='Nombre de Seccion'
                        name='nombre'
                        onChange={ (e) => setName(e.target.value) }
                    />
                </div>
              
    
                <div className=''>
                    <input
                        className='bg-blue-500 w-1/2 py-1 rounded-md shadow-lg text-white cursor-pointer'
                        type="submit"
                        value="Guardar"
                    />
                </div>
              
            </form>
        </Modall>    
        </>
    )
}

export default AddSeccion
