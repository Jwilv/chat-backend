const { userConnect, userDisconnect, getUsers, recordMessage } = require("../controllers/sockets");
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

            socket.join(uid)

            this.io.emit('list-users', await getUsers() );

            socket.on('personal-message', async(payload)=>{
                const message = await recordMessage(payload);
                this.io.to(payload.para).emit('personal-message', message);
                this.io.to(payload.de).emit('personal-message', message);
            });

            socket.on('disconnect', async () => {
                await userDisconnect(uid);
                this.io.emit('list-users', await getUsers() );
            
            })

        })

    }
}

module.exports = Sockets