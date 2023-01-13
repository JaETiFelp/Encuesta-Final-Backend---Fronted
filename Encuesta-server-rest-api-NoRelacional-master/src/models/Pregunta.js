const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const preguntaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    tipoPregunta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoPregunta',
        required: true
    },
    optionRespuesta: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OptionRespuesta'
        }
    ],
    multiple: {
        type: Boolean,
        default: false
    },
    state: {
        type: Boolean,
        default: false
    }
});

const Pregunta = mongoose.model('Pregunta', preguntaSchema);
module.exports = {
    Pregunta
}