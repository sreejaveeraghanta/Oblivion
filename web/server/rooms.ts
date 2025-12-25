interface Room {
    hostId: string;
    players: {[socketId: string]: string};
}

const rooms: {[roomId: string]: Room} = {}

const generateId = () => {
    return Math.random().toString(36).substring(2, 6).toUpperCase()
}

// Create a new room 
export const createRoom = (hostId: string) => {
    let roomId: string
    do {
        roomId = generateId()
    } while (rooms[roomId])

    rooms[roomId] = {
        hostId,
        players: {}
    }

    return roomId;
}

// Map a player by socket ID to a room - each player has a unique socket ID
// Player name is also stored
export const joinRoom = (roomId: string, socketId: string, playerName: string) => {
    const room  = rooms[roomId]
    if (room) {
        room.players[socketId] = playerName
        return true
    }
    return false
}