import { Stack, Typography } from "@mui/material";
import {useLocation} from "react-router-dom"



function GameRoom() {
    const location = useLocation()
    const roomID = location.state as string;
    console.log(roomID)
        
    return (
        <><Stack direction= "row"spacing={2} sx={{ position: "relative" }}>
            <Typography sx={{ position: "absolute", top: 3, left: 3}}> {roomID} </Typography>
            {/* TODO Populate the data for the total number of players with data from the database */}
            <Typography sx={{ position: "absolute", top: 3, right: 3}}> total players </Typography>
        </Stack><Stack spacing={3} alignItems="center" justifyContent="center" height="100vh">
                <Typography variant="h1"> Oblivion </Typography>
            </Stack></>
    )}

export default GameRoom