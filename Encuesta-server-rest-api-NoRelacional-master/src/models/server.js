const express = require('express');
const cors  = require('cors');
const { createConnection } = require('../database/connection');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.api = process.env.API;

        createConnection();
        //middlewares
        this.middlewares();
        //routes
        this.routes();
    }

    middlewares(){

        this.app.use(express.json());
        this.app.use(cors());
        this.app.options('*', cors());
    }

    routes(){
        this.app.use('/', require('../routes/home'));
        this.app.use(`${this.api}/auth`, require('../routes/auth'));
        this.app.use(`${this.api}/encuestas`, require('../routes/encuestas'));
        this.app.use(`${this.api}/preguntas`, require('../routes/preguntas'));
        this.app.use(`${this.api}/tipopreguntas`, require('../routes/tipoPregunta'));
        this.app.use(`${this.api}/seccions`, require('../routes/seccion'));
        this.app.use(`${this.api}/opcionrespuestas`, require('../routes/optionRespuesta'));
        this.app.use(`${this.api}/encuestaaplicadas`, require('../routes/encuestaAplicada'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server running on port', this.port);
        });
    }
}

module.exports = Server;