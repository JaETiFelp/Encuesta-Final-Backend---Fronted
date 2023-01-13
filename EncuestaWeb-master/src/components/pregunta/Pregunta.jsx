import React from 'react'
import ListaORespuesta from '../opcionRespuesta/ListaORespuesta'
import axios from 'axios'
const Pregunta = ( { pregunta, setAddModalOR, setIdOR, preguntaF, setPregunta, seccion, setEditModalOR, setIdOREdit, setValue, setPreguntaEf }) => {

    const add = () => {
        setAddModalOR(true)
        setIdOR(pregunta._id)
    }
    const edit = () => {
        setPregunta({
            nombre: pregunta.name,
            seccion: seccion._id,
            tipoPregunta: pregunta.tipoPregunta._id,
            multiple: pregunta.multiple,
            id: pregunta._id
        })
    }

    const deleteP = () => {
        
        if (confirm('Se eliminara la Pregunta')){
            axios({
                method: 'delete',
                url: `https://encuestas-server-rest-api.herokuapp.com/api/v1/preguntas/${pregunta._id}`
            })
            .then( (res) =>{
                console.log(res)
                setPreguntaEf({
                    id: pregunta._id,
                    value: pregunta.name
                })
 
             }).catch( err =>{
                 console.log(err);
                 throw new Error(err);
             });
        }
    }

    return (
        <div className='container bg-gray-100  shadow-xl rounded-md py-3 mb-5'>
            <div className='bg-white py-2 mx-5 shadow-xl rounded-md mb-2'>
                <p className='text-center text-blue-500 font-bold uppercase'> ¿ { pregunta.name} ? </p>
            </div>
           <div className='mx-10'>

                { pregunta.optionRespuesta.map( ( option ) =>
                   <ListaORespuesta
                        key={ option._id}
                        option={ option }
                        setEditModalOR = { setEditModalOR }
                        setIdOREdit = { setIdOREdit }
                        setValue = { setValue }
                        setPreguntaEf={ setPreguntaEf }
                   />
                )}
            
                <div className='text-black flex justify-center'>
                        <button className='bg-blue-400 mr-2 rounded-sm shadow-lg text-sm px-2 font-semibold'
                            title='agregar'
                            onClick={ add }
                            >
                            agregar 
                        </button>
                        <button className='bg-yellow-300 mr-2 rounded-sm shadow-lg text-sm px-2 font-semibold'
                            title='edit'
                            onClick={ edit }
                        >
                            editar
                        </button>
                        <button className='bg-red-400 mr-2 rounded-sm shadow-lg text-sm px-2 font-semibold'
                            title='delete'
                            onClick={ deleteP }
                        >
                            eliminar
                        </button>
                </div>

           </div>
        </div>
    )
}

export default Pregunta
