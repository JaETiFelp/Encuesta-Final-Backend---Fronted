import React from 'react'
import axios from 'axios'

const ListaORespuesta = ({option, setEditModalOR, setIdOREdit, setValue, setPreguntaEf }) => {
    const editOR = () => {
        setEditModalOR(true)
        setIdOREdit(option._id)
        setValue(option.value)
    }

    const deleteOR = () => {
        
        if (confirm('Se eliminara la Opcion Respuesta')){
            axios({
                method: 'delete',
                url: `https://encuestas-server-rest-api.herokuapp.com/api/v1/opcionrespuestas/${option._id}`
            })
            .then( (res) =>{
                console.log(res)
                setPreguntaEf({
                    id: option.id,
                    value: option.value
                })
 
             }).catch( err =>{
                 console.log(err);
                 throw new Error(err);
             });
        }
    }
    
    return (
        <>
           <div className='flex justify-between'>
                    <p className='my-2 uppercase'> { "  " + option.value }</p>
                    <div className='text-black pt-3'>
                        <button className='bg-yellow-300 mr-2 rounded-sm shadow-lg text-sm px-1'
                            title='edit'
                            onClick={ editOR }
                        > 
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                            <line x1="16" y1="5" x2="19" y2="8" />
                        </svg>
                        </button>
                        
                        <button className='bg-red-400 mr-2 rounded-sm shadow-lg text-sm px-1'
                            title='delete'
                            onClick={ deleteOR }
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <line x1="4" y1="7" x2="20" y2="7" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                        </button>
                </div>
            </div>  
        
        </>
    )
}

export default ListaORespuesta
