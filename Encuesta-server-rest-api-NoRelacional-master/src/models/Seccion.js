const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const seccionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pregunta'
    }],
    state: {
        type: Boolean,
        default: false 
    }
});

const Seccion = mongoose.model('Seccion', seccionSchema);
module.exports = {
    Seccion
}