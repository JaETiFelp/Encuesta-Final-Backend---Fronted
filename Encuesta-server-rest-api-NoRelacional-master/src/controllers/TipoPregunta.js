const mongoose = require('mongoose');
const { TipoPregunta } = require('../models/TipoPregunta');

const postTipoPregunta = async (req, res) =>{
    const { name, type } = req.body;
    const tipoPregunta = new TipoPregunta( { name, type } ); 
    if ( !tipoPregunta )
        return res.status(400).json({ success: false, message: 'tipo de pregunta no pudo ser creado'});
    await tipoPregunta.save();
    return res.status(200).json({ success: true, tipoPregunta });
};

const getTipoPregunta = async (req, res) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id);
    if (!validarId){
        return res.status(400).json({ success: false, message: 'id no valido'});
    }
    const tipoPregunta =  await TipoPregunta.findById(id);
    if (!tipoPregunta){
    return res.status(400).json({ success: false, message: 'tipo de pregunta no encontrado'});
    }
    return res.status(200).json({ success: true, tipoPregunta });
};

const getTipoPreguntas = async (req, res) => {
    const tipoPreguntas = await TipoPregunta.find();
    if (!tipoPreguntas){
        res.status(400).json({ success: false, message: 'tipo de preguntas vacia'});
    }
    return res.json({ success: true, tipoPreguntas });
}

module.exports = {
    postTipoPregunta,
    getTipoPregunta,
    getTipoPreguntas
}
