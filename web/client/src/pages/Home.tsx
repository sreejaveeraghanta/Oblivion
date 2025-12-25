import { Stack, Typography } from "@mui/material";
import Button from "../components/Button";

function Home() {
    return (
        <Stack spacing={3} alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h4">Welcome to Oblivion!</Typography>
            <Button variant="contained" href="/host">
                Host Game
            </Button>
        </Stack>
    )
}

export default Home