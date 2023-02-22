const { userConnect, userDisconnect, getUsers } = require("../controllers/sockets");
const { checkToken } = require("../helpers/generateJWT");



class Sockets {

    constructor(io) {
        this.io = io;


        this.socketEvents();
    }

    socketEvents() {
        // on connection
        this.io.on('connection', async (socket) => {
            const [valid, uid] = checkToken(socket.handshake.query['x-token']);

            if (!valid) {
                socket.disconnect();
            }

            await userConnect(uid);

            this.io.emit('list-users', await getUsers() );

            socket.on('disconnect', async () => {
                await userDisconnect(uid);
            })

        })

    }
}

module.exports = Sockets