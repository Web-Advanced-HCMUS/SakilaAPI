class SocketService {
    //connection socket
    connection(socket) {
        socket.on('connection', () => {
            console.log(`User connect is ${socket.id}`)
        })


        //event on here
        socket.on('actor', msg => {
            console.log(`msg is ${msg}`)

        })
    }
}

export default new SocketService();
