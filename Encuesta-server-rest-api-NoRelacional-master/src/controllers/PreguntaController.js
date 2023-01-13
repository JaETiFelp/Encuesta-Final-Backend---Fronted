const mongoose = require('mongoose');
const { Pregunta } = require('../models/Pregunta');
const { Seccion } = require('../models/Seccion');
const { OptionRespuesta } = require('../models/OptionRespuesta')
const postPregunta = async (req, res) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id); 
    if ( !validarId ){
        return res.status(400).json({ success: false, message: 'El id de la seccion es incorrecto'});   
    }
    const validarIdSeccion = await Seccion.findById(id);

    if ( !validarIdSeccion ){
        return res.status(400).json({ success: false, message: 'El id de la sección no existe'});   
    }
    const { name, tipoPregunta, multiple} = req.body; 

    const validarTipo = mongoose.isValidObjectId(tipoPregunta);
    if (!validarTipo ){
        return res.status(400).json({ success: false, message: 'El tipo de pregunta no es valido'});  
    }
    const pregunta = new Pregunta( { name, tipoPregunta, multiple});
    if (!pregunta){
        return res.status(400).json({ success: false, message: 'Error al crear la pregunta'}); 
    }
    await pregunta.save();
    //
    const pregunta2 = await Pregunta.findById(pregunta.id).populate({path:'tipoPregunta', model: 'TipoPregunta'});
    if (pregunta2.tipoPregunta.type === 2){
        const optionrespuesta = new OptionRespuesta( { value:'Ninguno' });
        if (!optionrespuesta){
            return res.status(400).json({ success: false, message: 'Error al crear la option respuesta'}); 
        }
        await optionrespuesta.save();
        const respuesta = await Pregunta.findByIdAndUpdate(pregunta.id, { $push: { optionRespuesta: optionrespuesta.id} });
        if ( !respuesta){
            return res.status(400).json({ success: false, message: 'Error al agregar option respuesta a la pregunta'}); 
        }
    //
    }
    const seccion = await Seccion.findByIdAndUpdate(id, { $push: { questions: pregunta.id} });
    
    if ( !seccion){
        return res.status(400).json({ success: false, message: 'Error al agregar pregunta a la seccion'}); 
    }
    return res.status(200).json({ success: true, message: 'pregunta agregada correctamente' });  
}

const editPregunta = async (req, res) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id);
    if(!validarId){
        return res.status(400).json({ success: false, message: 'id no es valido'});
    }
    const pregunta = await Pregunta.findById(id);
    if(!pregunta){
        return res.status(400).json({ success: false, message: 'pregunta not fount'});
    }
    const { name, tipoPregunta, multiple } = req.body; 
    const preguntaUpdate = await
    Pregunta.findByIdAndUpdate(id , { name, tipoPregunta, multiple } );
    if(!preguntaUpdate){
        return res.status(400).json({ success: false, message: 'pregunta not update'});
    }
    console.log(preguntaUpdate)
    return res.status(200).json({ success: true, message: 'seccion is updated'});
}

const deletePregunta = async (req, res) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id);
    if(!validarId){
        return res.status(400).json({ success: false, message: 'id no es valido'});
    }
    const pregunta = await Pregunta.findById(id);
    if(!pregunta){
        return res.status(400).json({ success: false, message: 'pregunta not fount'});
    }
    
     await Seccion.updateMany({ $pull: { questions: { $in: `${id}`}}})
    const a =  await OptionRespuesta.deleteMany({ _id: { $in: pregunta.optionRespuesta }})
    console.log(a)
     await Pregunta.findByIdAndRemove(id)
    return res.status(200).json({ success: true, message: 'pregunta deleted'});
}

const getPregunta = async (req, res) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id);
    if(!validarId){
        return res.status(400).json({ success: false, message: 'id no es valido'});
    }
    const pregunta = await Pregunta.findById(id).populate({path: 'optionRespuesta', model: 'OptionRespuesta'});
    if(!pregunta){
        return res.status(400).json({ success: false, message: 'pregunta not fount'});
    }
    return res.status(200).json({ success: true, pregunta})
}

module.exports = {
    postPregunta,
    editPregunta,
    deletePregunta,
    getPregunta
}