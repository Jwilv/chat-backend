const express = require('express');
//Servidor de sockets
const http = require('http');
//socket
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //http server
        this.server = http.createServer(this.app);

        //configuraciones de sockets
        this.io = socketio(this.server, {/* configuraciones */ });

        this.sockets = new Sockets(this.io);

    }

    middelwares() {
        //desplegar directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')));


        //configuracion cors
        this.app.use(cors());

        //get de el historial de eventos
        this.app.get('/historial', (req, res) => {
            res.json({
                ok: true,
                ultimos: this.sockets.TicketList.showNumbers
            })
        })

    }

    goServer() {
        //desplegar server
        this.server.listen(this.port, () => {
            console.log(`server corriendo en el port:${this.port}`);
        });
    }

    // configureSockets(){
    //     new Sockets( this.io);
    // }

    execute() {
        this.middelwares();
        //this.configureSockets();
        this.goServer();
    }


}

module.exports = Server;