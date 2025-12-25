import express from "express"
import http from "http"
import { Server, Socket } from "socket.io"
import { createRoom, joinRoom } from "./rooms.js"
import dotenv from "dotenv"

dotenv.config()
const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "*",
    },
})

io.on("connection", (socket: Socket) => {
    console.log("a user connected:", socket.id)

    socket.on("createRoom", () => {
        const roomId = createRoom(socket.id)
        socket.join(roomId)
        socket.emit("roomCreated", roomId)
        console.log(`Room ${roomId} created by host ${socket.id}`)
    })
    
    socket.on("joinRoom", ({roomId, playerName}: {roomId: string, playerName: string}) => {
        const success = joinRoom(roomId, socket.id, playerName)
        if (success) {
            socket.join(roomId)
            io.to(roomId).emit("playerJoined", {socketId: socket.id, playerName})
            console.log(`Player ${playerName} joined room ${roomId}`)
        } else {
            socket.emit("error", "Room not found")
            console.log(`Failed to join room ${roomId}: Room not found`)
        }
    })

    socket.on("disconnect", () => {
        // TODO: remove player from room, how to find which room they were in?


        console.log("user disconnected:", socket.id)
    })
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})