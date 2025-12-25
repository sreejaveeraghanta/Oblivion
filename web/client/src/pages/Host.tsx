import { Stack, Typography } from '@mui/material'
import Button from '../components/Button'
import { socket } from '../utils/socket.ts'
import { useEffect, useState } from 'react'



function Host() {
    const [roomId, setRoomId] = useState('')

    useEffect(() => {
        const handleRoomCreated = (id: string) => {
            setRoomId(id)

            // no need to join room here since server already adds host to the room upon creation
        }
        // Set up listener once component mounts
        socket.on("roomCreated", handleRoomCreated)

        // Clean up listener when component unmounts
        return () => {
            socket.off("roomCreated", handleRoomCreated)
        }
    }, [])

    const [players, setPlayers] = useState<{socketId: string, playerName: string}[]>([])

    useEffect(() => {
        // TODO: how to handle player leaving?
        const handlePlayerJoined = ({socketId, playerName}: {socketId: string, playerName: string}) => {
            setPlayers((prevPlayers) => [...prevPlayers, {socketId, playerName}])
        }

        socket.on("playerJoined", handlePlayerJoined)

        return () => {
            socket.off("playerJoined", handlePlayerJoined)
        }
    }, [])

    const createRoom = () => {
        console.log('Creating room...')
        socket.emit('createRoom')
    }

    return (
        <Stack spacing={3} alignItems="center" justifyContent="center" height="100vh">
            <Button variant="outlined" onClick={() => {createRoom()}}>
                Create a room
            </Button>
            {roomId && 
            <Typography variant="h6">
                Room code: {roomId}
            </Typography>
            }
            {players.length > 0 &&
            <Stack spacing={1} alignItems="center">
                <Typography variant="h6">Players Joined: {players.length}</Typography>
                {players.map((player) => (
                    <Typography key={player.socketId}>{player.playerName}</Typography>
                ))}
            </Stack>
            }
        </Stack>
    )
}

export default Host