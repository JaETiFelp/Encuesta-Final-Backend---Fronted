const mongoose = require('mongoose');
const { Encuesta } = require('../models/Encuesta');
const { Seccion } = require('../models/Seccion');
const { Pregunta } = require('../models/Pregunta')
const { OptionRespuesta } = require('../models/OptionRespuesta')
const postEncuesta = async (req, res) => {
    const { name, description, nro_veces, fecha_vigencia } = req.body;
    const encuesta = new Encuesta({ name, description, nro_veces, fecha_vigencia});
    if (!encuesta ){
        return res.status(400).json({ success: false, message: 'encuesta no creada'});
    }
    await encuesta.save();
    return res.json({ success: true, encuesta});
    
}

const editEncuesta = async (req, res) => {
    const id = req.params.id;
    const { name, description, nro_veces, fecha_vigencia } = req.body;
    const validarId = mongoose.isValidObjectId(id);
    if(!validarId){
        return res.status(400).json({ success: false, message: 'id no es valido'});
    }
    const encuesta = await Encuesta.findById(id);
    if(!encuesta){
        return res.status(400).json({ success: false, message: 'encuesta not fount'});
    }
    const encuestaUpdate = await
    Encuesta.findByIdAndUpdate(id , { name, description, nro_veces, fecha_vigencia } );
    if(!encuestaUpdate){
        return res.status(400).json({ success: false, message: 'encuesta not update'});
    }
    console.log(encuestaUpdate)
    return res.status(200).json({ success: true, message: 'encuesta is updated'});
    // return res.status(200).json({encuestaUpdate});
}

const getEncuesta = async (req, res ) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id);
    if(!validarId ){
        return res.status(400).json({ success: false, message: 'El id no es valido'});
    }
    const encuesta = await Encuesta.findById(id).where('state').equals(true).populate({path: 'sections', select: '-status -__v', populate: { path: 'questions', model: 'Pregunta', select: '-description -state -__v', populate: [ { path: 'tipoPregunta', model: 'TipoPregunta', select: ' -__v '}, { path: 'optionRespuesta', model: 'OptionRespuesta', select: '-__v '}] }});
 
    if (!encuesta){
        return res.status(400).json({ success: false, message: 'La encuesta no fue encontrada'});
    }
    return res.json({ success: true, encuesta });
}

const getEncuestaWeb = async (req, res ) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id);
    if(!validarId ){
        return res.status(400).json({ success: false, message: 'El id no es valido'});
    }
    const encuesta = await Encuesta.findById(id).populate({path: 'sections', select: '-status -__v', populate: { path: 'questions', model: 'Pregunta', select: '-description -state -__v', populate: [ { path: 'tipoPregunta', model: 'TipoPregunta', select: ' -__v '}, { path: 'optionRespuesta', model: 'OptionRespuesta', select: '-__v '}] }});
 
    if (!encuesta){
        return res.status(400).json({ success: false, message: 'La encuesta no fue encontrada'});
    }
    return res.json({ success: true, encuesta });
    
}

const getEncuestas = async (req, res) => {
    
    const encuestas = await Encuesta.find().where('state').equals(true);
    if (!encuestas){
        res.status(400).json({ success: false, message: 'encuesta vacia'});
    }
    return res.json({ success: true, encuestas });
}

const getEncuestasWeb = async (req, res) => {
    
    const encuestas = await Encuesta.find();
    if (!encuestas){
        res.status(400).json({ success: false, message: 'encuesta vacia'});
    }
    return res.json({ success: true, encuestas });
}

const getEncuestasW = async (req, res) => {
    const encuestas = await Encuesta.find().populate({path: 'sections', populate: { path: 'questions', model: 'Pregunta', populate: [ {path: 'tipoPregunta', model: 'TipoPregunta'}, {path: 'optionRespuesta', model: 'OptionRespuesta'}]}});
    if (!encuestas){
        res.status(400).json({ success: false, message: 'encuesta vacia'});
    }
    return res.json({ success: true, encuestas });
}
// populate([ { path: 'answers.id_question', model: 'Pregunta', select: 'name'}, { path: 'answers.id_option_respuestas', model: 'OptionRespuesta', select: 'value'}]);
// .populate({path: 'sections', select: '-status -__v', populate: { path: 'questions', model: 'Pregunta', select: '-description -state -__v', populate: [ { path: 'tipoPregunta', model: 'TipoPregunta', select: ' -__v '}, { path: 'optionRespuesta', model: 'OptionRespuesta', select: '-__v '}] }});
const deleteEncuesta = async (req, res) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id);
    if(!validarId){
        return res.status(400).json({ success: false, message: 'id no es valido'});
    }
    const encuesta = await Encuesta.findById(id);
    if(!encuesta){
        return res.status(400).json({ success: false, message: 'encuesta not fount'});
    }
    
    for (let index = 0; index < encuesta.sections.length; index++) {
        const obj = encuesta.sections[index]; 
        const s = await Seccion.findById(obj._id)
        for (let index2 = 0; index2 < s.questions.length; index2++) {
            const obj2 = s.questions[index2];
            const qs = await Pregunta.findById(obj2._id)
            for (let index3 = 0; index3 < qs.optionRespuesta.length; index3++) {
                const obj3 = qs.optionRespuesta[index3];
                await OptionRespuesta.findByIdAndRemove(obj3._id)
            }
            await Pregunta.findByIdAndRemove(obj2._id)
            
        }

    }

    await Seccion.deleteMany({ _id: { $in: encuesta.sections }})
    await Encuesta.findByIdAndRemove(id);
    return res.json({ success: true, message: 'encuesta deleted' });
}

const changeState =  async (req, res) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id);
    if(!validarId){
        return res.status(400).json({ success: false, message: 'id no es valido'});
    }
    const encuesta = await Encuesta.findById(id);
    if(!encuesta){
        return res.status(400).json({ success: false, message: 'encuesta not fount'});
    }
    const { state } = req.body;
    const stateUpdate = await
    Encuesta.findByIdAndUpdate(id , { state } );
    if(!stateUpdate){
        return res.status(400).json({ success: false, message: 'estado de encuesta not update'});
    }
    return res.json({ success: true, message: 'state update!'})
}
module.exports = {
    postEncuesta,
    getEncuesta,
    getEncuestas,
    editEncuesta,
    deleteEncuesta,
    getEncuestasW,
    getEncuestasWeb,
    getEncuestaWeb,
    changeState
}