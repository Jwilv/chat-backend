const { checkToken } = require("../helpers/generateJWT");



class Sockets {

    constructor(io) {
        this.io = io;


        this.socketEvents();
    }

    socketEvents() {
        // on connection
        this.io.on('connection', (socket) => {
            const [valid, uid] = checkToken(socket.handshake.query['x-token']);

            if(!valid){
                socket.disconnect();
            }

        console.log('user connect',uid);

        socket.on('disconnect',()=>{
            console.log('user disconnect');
        })

        })

    }
}

module.exports = Sockets