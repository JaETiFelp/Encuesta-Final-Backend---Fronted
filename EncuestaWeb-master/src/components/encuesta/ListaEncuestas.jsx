import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Encuesta from './Encuesta'
import FormularioEncuesta from './FormularioEncuesta'
import EditEncuesta from './EditEncuesta'
import ChangeState from './ChangeState'

const ListaEncuestas = () => {
    // state
    const [encuestas, setEncuestas] = useState([]);
    const [encuestaEf, setEncuestaEf] = useState({});
    const [editSt, setEditSt] = useState({
        nombre: '',
        descripcion: '',
        nro_veces: '',
        fecha_vigencia: '',
        id: ''
    });
    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);

    const [changeState, setChangeState] = useState(false);
    const [idState, setIdState ] = useState('')

   useEffect( () => {
        
        axios.get('https://encuestas-server-rest-api.herokuapp.com/api/v1/encuestas/web/w')
        .then( (res) => {
            console.log(res.data)
            setEncuestas(res.data.encuestas)
        })
   },[encuestaEf]);

    return (
        <>
        
        <div className='bg-white my-5 mx-20 shadow-lg px-5  absolute'>
            <div className='my-4 mx-4 pt-5 pb-1 flex justify-between'> 
                <h1 className='font-bold text-blue-900'> Encuestas </h1>
                <button className='bg-blue-200 font-bold text-blue-900 rounded-md shadow-md px-2 py-1'
                    onClick={ () => setModal(true) }
                    > Agregar encuesta</button>
            </div>
            <hr color='blue'/>
            
            <table className='mt-10'>
					<thead className=''>
						<tr className='text-blue-600 text-sm'>
							<th>
								
							</th>
							<th className='pr-5'>Nombre</th>
							<th className='pr-5'>Descripción</th>
							<th className='pr-5'>Nro Veces</th>
							<th className='pr-5'>Fecha creación</th>
                            <th className='pr-5'>Fecha vigencia</th>
							<th className='pr-5'>Actions</th>
						</tr>
					</thead>

                  
                    { encuestas.map( (encuesta) => 
                    
                    <Encuesta
                            key={ encuesta._id}
                            encuesta = { encuesta }
                            setEditSt = { setEditSt }
                            setEdit = { setEdit }
                            setEncuestaEf = { setEncuestaEf }
                            setChangeState = { setChangeState }
                            setIdState  = { setIdState }
                            />
                            )}
				
			</table>
           
        </div>
        { modal && 
            <FormularioEncuesta 
                setModal = { setModal }
                setEncuestaEf = { setEncuestaEf }
            />}
        { edit && 
            <EditEncuesta
                setEdit = { setEdit }
                editSt = { editSt }
                setEditSt = { setEditSt }
                setEncuestaEf = { setEncuestaEf }
                
            />
        }
        {
            changeState &&
            <ChangeState
                setChangeState={ setChangeState }
                idState = { idState}
                setEncuestaEf = { setEncuestaEf }
            />
        }
        </>
    )
}

export default ListaEncuestas
