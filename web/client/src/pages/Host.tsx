import { Stack, Typography } from '@mui/material'
import Button from '../components/Button'
import { socket } from '../utils/socket.ts'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



function Host() {
    const [roomId, setRoomId] = useState('')
    const navigate = useNavigate()

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

    const [isRoomCreated, setRoomCreated] = useState(false)
    const [userMessage, setUserMessage] = useState("")
    const createRoom = () => {
        console.log('Creating room...')
        socket.emit('createRoom')
        setRoomCreated(true)
    }

    const startGame = () => {
        console.log(players.length,"")
        console.log('Starting game...')
        navigate('/game', {
            state: 
            roomId, 
        },)
    }

    useEffect(()=> {
        if (players.length > 6){ 
            console.log("reached maximum number of players")
            //TODO - make this so the player is blocked from joining a full room 
            // Currently just prevents host from starting game - host should have controls to delete players
            setUserMessage("There are too many players in the game")
        }
        else if (players.length < 2) {
            console.log("waiting for players to join")
            setUserMessage("Waiting for players to join")
        }
        else {
            setUserMessage("")
        }
    }, [players.length])
    return (
        <Stack spacing={3} alignItems="center" justifyContent="center" height="100vh">
            {!isRoomCreated && <Button variant="outlined" onClick={() => {createRoom()}}>
                Create room
            </Button> }
            {roomId && 
            <><Typography variant="h2">
                    Room code: {roomId}
                </Typography><Typography variant="h6"> {userMessage} </Typography></>
            }
            {players.length > 0 &&
            <><Stack spacing={1} alignItems="center">
                    <Typography variant="h4">Players Joined: {players.length}</Typography>
                    {players.map((player) => (
                        <Typography key={player.socketId}>{player.playerName}</Typography>
                    ))}
                </Stack>
                </>
            }
            {<Button variant="contained" onClick={() => startGame()} disabled={players.length < 2 || players.length > 6}>
                        Start game
            </Button>}

        </Stack>
    )
}

export default Host