import dotenv from "dotenv"
dotenv.config( )
import express from "express"
import { Server } from "socket.io"
import path from "path"

const PORT = process.env.PORT || 9000
const app = express()

app.use( express.static(path.join(process.cwd(),'src', 'public')) )

const server = app.listen(PORT, () => {
    console.log('http://localhost/' + PORT);
})

const io = new Server(server)

io.on('connection', socket  => {
    socket.on('new-user', name => {
        socket
        .broadcast
        .emit('new-user-joined', name)
    })
    socket.on('new-message', ({message, sender}) => {
        socket
        .broadcast
        .emit('new-user-message',({message, sender}) )
    })

    socket.on('user-typing', ( {sender}) => {
        socket
        .broadcast
        .emit('typing', { sender})
    })
} )


