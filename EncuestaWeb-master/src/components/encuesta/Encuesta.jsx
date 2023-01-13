import React,{ useState } from 'react'
import EditEncuesta from './EditEncuesta'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


const Encuesta = ( {encuesta, setEdit, setEditSt, setEncuestaEf, setChangeState, setIdState}) => {
    const navigate = useNavigate();

    const edit = () => {
        setEdit(true)
        setEditSt({
            nombre: encuesta.name,
            descripcion: encuesta.description,
            nro_veces: encuesta.nro_veces,
            fecha_vigencia: encuesta.fecha_vigencia,
            id: encuesta._id
        })
    }

    const deleteE = () => {
        
        if (confirm('Se eliminara la Encuesta')){
            axios({
                method: 'delete',
                url: `https://encuestas-server-rest-api.herokuapp.com/api/v1/encuestas/${encuesta._id}`
            })
            .then( (res) =>{
                console.log(res)
                setEncuestaEf({
                    nombre: encuesta.name,
                    descripcion: encuesta.description,
                })
 
             }).catch( err =>{
                 console.log(err);
                 throw new Error(err);
             });
        }
    }

    const ChangeSE = () => {
        setChangeState(true)
        setIdState(encuesta._id)
    }

    return (
        <>  
            <tbody className=''>
                <tr className='h-16 text-sm'>
                    <td>
                    
                    </td>
                    <td className='px-5'> { encuesta.name} </td>
                    <td className='pr-5'>{ encuesta.description } </td>
                    <td className='pr-5 text-center'> {encuesta.nro_veces}</td>
                    <td className='pr-5'> { encuesta.fecha_creacion}</td>
                    <td className='pr-5'> { encuesta.fecha_vigencia} </td>
                    <td>
                        {/* <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                    
                            <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a> */}
                    <div className='text-black'>

                        {
                            encuesta.state ? 

                            <button className='bg-green-500 mr-2 rounded-sm shadow-lg text-sm px-2 font-semibold'
                                title='delete'
                                onClick={ ChangeSE }
                                >
                                estado
                            </button>  
                            :    
                            
                            <button className='bg-red-400 mr-2 rounded-sm shadow-lg text-sm px-2 font-semibold'
                                title='delete'
                                onClick={ ChangeSE }
                                >
                                estado
                            </button>
                        }

                        <button className='bg-blue-400 mr-2 rounded-sm shadow-lg text-sm px-2 font-semibold'
                            title='ver'
                            onClick= {  () => navigate(`/encuestas/${encuesta._id}`) }
                        >
                            ver 
                        </button>
                        <button className='bg-yellow-300 mr-2 rounded-sm shadow-lg text-sm px-2 font-semibold'
                            title='edit'
                            onClick={ edit }
                        >
                            editar
                        </button>
                        <button className='bg-red-400 mr-2 rounded-sm shadow-lg text-sm px-2 font-semibold'
                            title='delete'
                            onClick={ deleteE }
                        >
                            eliminar
                        </button>
                       
                    </div>
                    </td>
                </tr>
                
            </tbody>



        </>
    )
}

export default Encuesta
