


class Sockets {

    constructor(io) {
        this.io = io;


        this.socketEvents();
    }

    socketEvents() {
        // on connection
        this.io.on('connection', (socket) => {
        console.log('user connect');

        socket.on('disconnect',()=>{
            console.log('user disconnect');
        })

        })

    }
}

module.exports = Sockets