import React, { useState,useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import FormularioPregunta from '../pregunta/FormularioPregunta';
import ListaPreguntas from '../pregunta/ListaPreguntas';
import AddSeccion from '../seccion/AddSeccion';
import ListaSeccion from '../seccion/ListaSeccion';
import axios from 'axios';
import EditSeccion from '../seccion/EditSeccion';
import AddORespuesta from '../opcionRespuesta/AddORespuesta';
import EditORespuesta from '../opcionRespuesta/EditORespuesta';
const VerEncuesta = () => {
    const { id } = useParams();

    const [seccions, SetSeccions] = useState([])
    const [preguntaEf, setPreguntaEf] = useState({}) 
    const [modalSeccion, setModalSeccion] = useState(false)
    const [seccionEf, setSeccionEf] = useState('')
    const [lista, setLista] = useState(true)
    //seccion
    const [editModalSeccion, setEditModalSeccion] = useState(false)
    const [idSeccion, setIdSeccion] = useState('')
    const [name, setNameSeccionSt] = useState('')
    const [secciones, setSecciones ] = useState([])
    //ORespuesta
    const [addModalOR, setAddModalOR] = useState(false)
    const [idOR, setIdOR] = useState('')
    const [editModalOR, setEditModalOR] = useState(false)
    const [value, setValue] = useState('')
    const [idOREdit, setIdOREdit] = useState('')
    //pregunta
    const [pregunta, setPregunta] = useState({
        nombre: '',
        seccion: '',
        tipoPregunta: '',
        multiple: '',
        id: ''
    })

    useEffect( () => {
        // axios.get('https://encuestas-server-rest-api.herokuapp.com/api/v1/encuestas')
        axios.get(`https://encuestas-server-rest-api.herokuapp.com/api/v1/encuestas/web/${id}`)
        .then( (res) => {
            console.log(res.data)
            SetSeccions(res.data.encuesta.sections)
        })
   },[preguntaEf]);

    return (
        <>
        <div className='container bg-white my-5 mx-20 shadow-lg px-5 h-full uppercase absolute'>
            <div className='my-4 mx-4 pt-5 pb-1 flex justify-between'> 
                <div className=''> 
                    <button className=' bg-blue-200 px-2 rounded-md font-bold text-blue-900 mr-10 hover:bg-blue-400'
                        onClick={ ()=> setLista(true)}
                    > Encuesta </button>
                    <button className='bg-blue-200 px-2 rounded-md font-bold text-blue-900 hover:bg-blue-400'
                        onClick={ ()=> setLista(false)}
                    > Secciones</button>
                </div>
                <button className='bg-blue-200 font-bold text-blue-900 rounded-md shadow-md px-2 py-1'
                    onClick={ () => setModalSeccion(true) }
                    > Agregar Seccion
                </button>
            </div>
            <hr color='blue'/> 
            <div className='flex my-10'>
                <FormularioPregunta
                    id= { id }
                    key={ id }
                    setPreguntaEf = { setPreguntaEf }
                    seccionEf = { seccionEf }
                    //secciones
                    secciones = { secciones }
                    setSecciones = { setSecciones }
                    //preguntas
                    pregunta = { pregunta }
                    setPregunta = { setPregunta }
                />
                {
                    lista ? 
                    <ListaPreguntas
                        seccions = { seccions }
                        setAddModalOR = { setAddModalOR }
                        setIdOR = { setIdOR }
                        //preguntas
                        preguntaF = { pregunta }
                        setPregunta = { setPregunta }
                        setPreguntaEf = { setPreguntaEf }
                        //OR
                        setEditModalOR = { setEditModalOR }
                        setIdOREdit = { setIdOREdit }
                        setValue = { setValue }
                   />
                    :
                    <ListaSeccion
                        secciones = { secciones }
                        setIdSeccion = { setIdSeccion }
                        setEditModalSeccion = { setEditModalSeccion }
                        setNameSeccionSt = { setNameSeccionSt }
                        setSeccionEf = { setSeccionEf }
                        setPreguntaEf = { setPreguntaEf }
                    /> 
                }
             
            </div>
    
             
        </div>
        {/* Modales */}
        {
            modalSeccion && 
            <AddSeccion
                id = { id }
                setModalSeccion = { setModalSeccion }
                setSeccionEf = { setSeccionEf }
            />
        }
        {
            editModalSeccion &&
            <EditSeccion
                idSeccion = { idSeccion }
                name = { name }
                setNameSeccionSt = { setNameSeccionSt }
                setEditModalSeccion = { setEditModalSeccion }
                setSeccionEf = { setSeccionEf }
            />
        }
        {
            addModalOR &&
            <AddORespuesta
                idOR = { idOR }
                setAddModalOR = {setAddModalOR }
                setPreguntaEf = { setPreguntaEf }
            />
        }
        {
            editModalOR && 
            <EditORespuesta
                setEditModalOR = { setEditModalOR }
                idOREdit = { idOREdit }
                value = { value }
                setValue = {setValue}
                setPreguntaEf = { setPreguntaEf }
            />
        }
        </>
    )
}

export default VerEncuesta
