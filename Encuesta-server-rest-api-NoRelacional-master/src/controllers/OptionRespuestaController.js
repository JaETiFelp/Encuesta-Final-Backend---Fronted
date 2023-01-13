const mongoose = require('mongoose');
const { Pregunta } = require('../models/Pregunta');
const { OptionRespuesta } = require('../models/OptionRespuesta');

const postOptionRespuesta = async (req, res) => {
    const { id_pregunta, value } = req.body;
    const validarId = mongoose.isValidObjectId(id_pregunta); 
    if ( !validarId ){
        return res.status(400).json({ success: false, message: 'El id de la Pregunta es incorrecto'});   
    }
    const validarIdPregunta = await Pregunta.findById(id_pregunta);

    if ( !validarIdPregunta ){
        return res.status(400).json({ success: false, message: 'El id de la pregunta no existe'});   
    }
    const optionrespuesta = new OptionRespuesta( { value });
    if (!optionrespuesta){
        return res.status(400).json({ success: false, message: 'Error al crear la option respuesta'}); 
    }
    await optionrespuesta.save();
    const respuesta = await Pregunta.findByIdAndUpdate(id_pregunta, { $push: { optionRespuesta: optionrespuesta.id} });
    
    if ( !respuesta){
        return res.status(400).json({ success: false, message: 'Error al agregar option respuesta a la pregunta'}); 
    }
    return res.status(200).json({ success: true, message: 'option respuesta agregada correctamente' });  
}

const editOptionRespuesta = async (req, res) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id);
    if(!validarId){
        return res.status(400).json({ success: false, message: 'id no es valido'});
    }
    const oRespuesta = await OptionRespuesta.findById(id);
    if(!oRespuesta){
        return res.status(400).json({ success: false, message: 'Opcion Respuesta not found'});
    }
    const { value } = req.body; 
    const oRespuestaUpdate = await
    OptionRespuesta.findByIdAndUpdate(id , { value } );
    if(!oRespuestaUpdate){
        return res.status(400).json({ success: false, message: 'Opcion Respuesta not update'});
    }
    console.log(oRespuestaUpdate)
    return res.status(200).json({ success: true, message: 'Opcion Respuesta is updated'});
}
const deleteOptionRespuesta = async (req, res) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id);
    if(!validarId){
        return res.status(400).json({ success: false, message: 'id no es valido'});
    }
    const oRespuesta = await OptionRespuesta.findById(id);
    if(!oRespuesta){
        return res.status(400).json({ success: false, message: 'Opcion Respuesta not found'});
    }
    const a = await Pregunta.updateMany({ $pull: { optionRespuesta: {$in: `${id}` }}})
    await OptionRespuesta.findByIdAndRemove(id);
    return res.status(200).json({ success: true, message: 'Opcion Respuesta deleted'});
}
module.exports = {
    postOptionRespuesta,
    editOptionRespuesta,
    deleteOptionRespuesta
}