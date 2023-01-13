import React from 'react'
import axios from 'axios'

const Seccion = ({seccion, setEditModalSeccion, setNameSeccionSt, setIdSeccion, setSeccionEf, setPreguntaEf}) => {
    const editSeccion = ()=> {
        setEditModalSeccion(true)
        setNameSeccionSt(seccion.name)
        setIdSeccion(seccion._id)
    }

    
    const deleteS = () => {
        
        if (confirm('Se eliminara la Seccion')){
            axios({
                method: 'delete',
                url: `https://encuestas-server-rest-api.herokuapp.com/api/v1/seccions/${seccion._id}`
            })
            .then( (res) =>{
                console.log(res)
                setSeccionEf(Math.random())
                setPreguntaEf({
                    id:seccion._id,
                    value: seccion.name
                })
             }).catch( err =>{
                 console.log(err);
                 throw new Error(err);
             });
        }
    }

    return (
        <>
             <div className='container bg-gray-100  shadow-xl rounded-md py-3 mb-5'>
            <div className='bg-white py-2 mx-5 shadow-xl rounded-md mb-2'>
                <p className='text-center text-blue-500 font-bold uppercase'>  {  seccion.name}  </p>
            </div>
           <div className='mx-10'>

                <div className='text-black flex justify-center'>

                        <button className='bg-yellow-300 mr-2 rounded-sm shadow-lg text-sm px-2 font-semibold'
                            title='edit'
                            onClick= { editSeccion }
                        >
                            editar
                        </button>
                        <button className='bg-red-400 mr-2 rounded-sm shadow-lg text-sm px-2 font-semibold'
                            title='delete'
                            onClick={ deleteS }
                        >
                            eliminar
                        </button>
                </div>

           </div>
        </div>
        
        </>
    )
}

export default Seccion
