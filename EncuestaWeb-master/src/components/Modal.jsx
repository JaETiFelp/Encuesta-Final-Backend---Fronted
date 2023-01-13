import React from 'react'
import styled from '@emotion/styled'
const Modall = styled.div`
position: relative;
background-color: gray;
opacity: 1;
width: 10rem;
margin: 5rem auto;
width: 40%;
height: 29rem;
`
const Modal = ( {setModal} ) => {
    return (
        <Modall>
            <div className='text-right pr-2 font-bold'>
                <button className='text-white'
                    onClick={ () => setModal(false) }
                > X</button>
            </div>
            <form className='text-center'>
                <div className='mt-20 '>
                    <input
                        type="text"
                        className='w-1/2 text-center py-1'
                        placeholder='Nombre'
                    />
                </div>
                <div className='my-7'>
                 
                    <textarea
                        type="text"
                        className='w-1/2 text-center py-1'
                        placeholder='Descripción'
                    />
                </div>
                <div className='my-7'>
                    <input
                        type="number"
                        className='w-1/2 text-center py-1'
                        placeholder='Nro Veces'
                    />
                </div>
                <div className='my-7'>
                    <input
                        type="date"
                        className='w-1/2 text-center text-black py-1'
                        placeholder='Fecha Vigencia'
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
    )
}

export default Modal
