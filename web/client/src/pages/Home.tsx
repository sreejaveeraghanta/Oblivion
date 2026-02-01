import { Stack, Typography } from "@mui/material";
import Button from "../components/Button";
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate()
    return (
        <Stack spacing={3} alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h2">Welcome to Oblivion!</Typography>
                <Button variant="contained" onClick={() => navigate('/host')}>
                Host Game
            </Button>
        </Stack>
    )
}

export default Home