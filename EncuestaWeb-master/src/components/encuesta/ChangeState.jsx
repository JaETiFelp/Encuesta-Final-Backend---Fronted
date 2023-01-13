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
const ChangeState = ({setChangeState, idState, setEncuestaEf}) => {

    const [error, setError] = useState(false)
    const [state, setState] = useState('')

    const submitChangeState = (e) => {
        e.preventDefault();

        if([state].includes('')){
            console.log('error')
            setError(true)
            return;
        } else 
        {
            let b = false;
            if (state === 'true')
             b = true
            console.log(b)
            axios({
                method: 'put',
                url: `https://encuestas-server-rest-api.herokuapp.com/api/v1/encuestas/web/${idState}`,
                data: { state: b }
            })
            .then( res => {
                console.log(res);
                setEncuestaEf({
                    id: state
                })
            })
            .catch( err =>{
                console.log(err);
                throw new Error(err);
            });
            setChangeState(false)
        }

    }

    return (
        <>
            <Modall>
            <div className='text-right pr-3 pt-2 font-bold'>
                <button className='text-white'
                    onClick={ () => setChangeState(false) }
                > X</button>
            </div>
            {error && <Alerta title={"Campos Vacios"}/>}
            <form className='text-center'  
                onSubmit={ submitChangeState }
            >

                <div className='my-8'>
                    <select className='bg-blue-400 w-96 text-center py-1 hover:bg-blue-500'
                        onChange={ (e) => setState(e.target.value)}
                    >
                            <option value={''}> Estado </option>
                            <option value={true }> Activada </option>
                            <option value={ false }> Desactivada </option>
                    </select>
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

export default ChangeState
