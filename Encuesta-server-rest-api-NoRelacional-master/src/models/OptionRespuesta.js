const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const optionRespuestaSchema = new Schema({
    value: {
        type: String
    }
});

const OptionRespuesta = mongoose.model('OptionRespuesta', optionRespuestaSchema);
module.exports = {
    OptionRespuesta
}