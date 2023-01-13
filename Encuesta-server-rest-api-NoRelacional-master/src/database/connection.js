const mongoose = require('mongoose');

const createConnection = ()=>{

    mongoose.connect(process.env.URI,{
        useNewUrlParser: true,
        UseUnifiedTopology: true,
    })
    .then( resp =>{
        console.log('data base connect');
    })
    .catch( err =>{
        console.log(err)
    })

};

module.exports = {
    createConnection
}