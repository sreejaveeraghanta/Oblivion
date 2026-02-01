import express from "express"
import http from "http"
import { Server, Socket } from "socket.io"
import { createRoom, joinRoom } from "./rooms.js"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import { Sequelize } from 'sequelize-typescript';
import dbConfig from './config/db_config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
const app = express()
const server = http.createServer(app)

const sequelize = new Sequelize(
  dbConfig.dev.database,
  dbConfig.dev.username,
  dbConfig.dev.password ?? '',
  {
    host: dbConfig.dev.host,
    dialect: dbConfig.dev.dialect,
    modelPaths: [path.join(__dirname, 'models')],
    logging: console.log,
  },
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');

    // sync({ alter: true }) checks the current state of the DB 
    // and makes necessary changes to match models
    await sequelize.sync({ alter: true });
    console.log('📂 All models were synchronized successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

testConnection();

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