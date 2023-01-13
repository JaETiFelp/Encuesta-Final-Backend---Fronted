const mongoose = require('mongoose');

const { Encuesta } = require('../models/Encuesta');
const { Pregunta } = require('../models/Pregunta');
const { Seccion } = require('../models/Seccion');
const { OptionRespuesta } = require('../models/OptionRespuesta');

const postSeccion = async (req, res) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id); 
    if ( !validarId ){
        return res.status(400).json({ success: false, message: 'El id de la encuesta es incorrecto'});   
    }
    const validarIdEncuesta = await Encuesta.findById(id);

    if ( !validarIdEncuesta ){
        return res.status(400).json({ success: false, message: 'El id de la encuesta no existe'});   
    }
    const { name } = req.body; 

    const seccion = new Seccion( { name });
    await seccion.save();
    const encuesta = await Encuesta.findByIdAndUpdate(id, { $push: { sections: seccion.id} });
    
    if ( !encuesta){
        return res.status(400).json({ success: false, message: 'Error al agregar pregunta a la encuesta'}); 
    }
    return res.status(200).json({ success: true, message: 'seccion agregada correctamente' });  
}

const getSeccions = async (req, res) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id);
    if(!validarId ){
        return res.status(400).json({ success: false, message: 'El id no es valido'});
    }
    const encuesta = await Encuesta.findById(id).populate({path: 'sections', select: '-status -__v'});
 
    if (!encuesta){
        return res.status(400).json({ success: false, message: 'La encuesta no fue encontrada'});
    }
    return res.json({ success: true, encuesta });
    
}

const editSeccion = async (req, res) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id);
    if(!validarId){
        return res.status(400).json({ success: false, message: 'id no es valido'});
    }
    const { name } = req.body; 
    const seccion = await Seccion.findById(id);
    if(!seccion){
        return res.status(400).json({ success: false, message: 'seccion not fount'});
    }
    const seccionUpdate = await
    Seccion.findByIdAndUpdate(id , { name } );
    if(!seccionUpdate){
        return res.status(400).json({ success: false, message: 'seccion not update'});
    }
    console.log(seccionUpdate)
    return res.status(200).json({ success: true, message: 'seccion is updated'});
}

const deleteSeccion = async (req, res) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id);
    if(!validarId){
        return res.status(400).json({ success: false, message: 'id no es valido'});
    }
    const seccion = await Seccion.findById(id);
    if(!seccion){
        return res.status(400).json({ success: false, message: 'seccion not fount'});
    }


    await Encuesta.updateMany({ $pull: { sections: { $in: `${id}`}}})

    for (let index = 0; index < seccion.questions.length; index++) {
        const obj = seccion.questions[index];
        const qs = await Pregunta.findById(obj._id)
        console.log(qs)
        for (let index2 = 0; index2 < qs.optionRespuesta.length; index2++) {
            const obj2 = qs.optionRespuesta[index2];
            await OptionRespuesta.findByIdAndRemove(obj2._id)
        }
        await Pregunta.findByIdAndRemove(obj._id)
        
    }

    const b = await Seccion.deleteMany({ _id: { $in: seccion.questions }})
    console.log(b)
    await Seccion.findByIdAndRemove(id);
    return res.status(200).json({ success: true, message: 'seccion deleted'});
}

module.exports = {
    postSeccion,
    getSeccions,
    editSeccion,
    deleteSeccion
}