const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required:[true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [ true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'La contrasena es obligatorio']
    },
    type: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = {
    User
}