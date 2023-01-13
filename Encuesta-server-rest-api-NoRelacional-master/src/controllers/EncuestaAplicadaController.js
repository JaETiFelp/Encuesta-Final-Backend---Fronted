const { EncuestaAplicada } = require('../models/EncuestaAplicada');
const { Encuesta } = require('../models/Encuesta');
const {OptionRespuesta } = require('../models/OptionRespuesta');
const { Pregunta } = require('../models/Pregunta')
const mongoose = require('mongoose');


const postEncuestaAplicada = async (req, res) => {
    const { answers } = req.body;
        const validarId =  mongoose.isValidObjectId(answers.id_encuesta);
    if (!validarId){
        return res.status(401).json({ success: false, message: 'Id no valido'});
    }
    const encuesta = await Encuesta.findById(answers.id_encuesta);
    if (!encuesta){
        return res.status(401).json({ success: false, message: 'La encuesta no existe'});
    }

    const aplicacion = new EncuestaAplicada( { id_encuesta: answers.id_encuesta, answers: answers.answers }); 
    if ( !aplicacion )
        return res.status(400).json({ success: false, message: 'aplicacion encuesta no pudo ser creado'});
    await aplicacion.save();
    // console.log(answers.answers)
    return res.status(200).json({ success: true, message: 'aplicacion encuesta creada!' });
} 


const getEncuestasAplicadas = async (req, res) => {
    const encuestasaplicadas = await EncuestaAplicada.find().populate([ { path: 'answers.id_question', model: 'Pregunta', select: 'name'}, { path: 'answers.id_option_respuestas', model: 'OptionRespuesta', select: 'value'}]);
    if (!encuestasaplicadas){
        return res.status(401).json({ success: false, message: 'Encuestas aplicadas no existen'});
    }
    res.json({ success: true, encuestasaplicadas});
}

const getResultadosPr = async (req, res) => {
    const { id_encuesta, id_pregunta} = req.body;
    
    const validarId =  mongoose.isValidObjectId(id_encuesta);
    const validarId2 = mongoose.isValidObjectId(id_pregunta)
    if (!validarId){
        return res.status(401).json({ success: false, message: 'Id no valido'});
    }
    if (!validarId2){
        return res.status(401).json({ success: false, message: 'Id no valido'});
    }
    const encuesta = await Encuesta.findById(id_encuesta);
    if (!encuesta){
        return res.status(401).json({ success: false, message: 'La encuesta no existe'});
    }
    const pregunta = await Pregunta.findById(id_pregunta).populate({path:'optionRespuesta', model: 'OptionRespuesta'});
    if (!pregunta){
        return res.status(401).json({ success: false, message: 'La Pregunta no existe'});
    }
    let cant = 0;
    var array = pregunta.optionRespuesta;
    var array2 = array.map( (elem) =>
        {
           return {
               id: elem.id,
               nombre: elem.value,
               cant: 0
           }
        }

    )
    const aplicacions = await EncuestaAplicada.find({ id_encuesta: id_encuesta} );
    aplicacions.map( (aplicacion) =>
        aplicacion.answers.map( respuesta => 
            // console.log('hola'),
            (respuesta.id_question === id_pregunta ) &&
                    array2.map( (elem)=>
                        // console.log('hola'),
                            respuesta.id_option_respuesta.map( (e) =>
                                    // console.log(elem)
                                    (elem.id === e) &&
                                    (
                                        elem.cant++
                                        // console.log('a')
                                    )
                                
                            )
                        
                    )  
        )
    )
    
    return res.json({ success: true, resultados: array2})

}

module.exports = {
    postEncuestaAplicada,
    getEncuestasAplicadas,
    getResultadosPr
}