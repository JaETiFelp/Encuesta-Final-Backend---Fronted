const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const encuestaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    nro_veces: {
        type: Number,
        required: true
    },
    sections: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seccion'
    }],
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    fecha_modificacion: {
        type: Date,
        default: ''
    },
    fecha_vigencia: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: false
    }
});

const Encuesta = mongoose.model('Encuesta', encuestaSchema);
module.exports = {
    Encuesta
}