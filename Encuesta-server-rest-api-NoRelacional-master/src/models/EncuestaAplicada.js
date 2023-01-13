const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const encuestaAplicadaSchema = new Schema({
    id_encuesta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Encuesta',
        required: true
    },
    answers: {
        type: Array,
        required: true
    }
});

const EncuestaAplicada = mongoose.model('EncuestaAplicada', encuestaAplicadaSchema);
module.exports = {
    EncuestaAplicada
}