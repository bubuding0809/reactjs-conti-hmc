import { Fab, Grid, Stack, TextField, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";

export default function VoiceCaller() {
    return (
        <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            borderRadius={2}
            p={1}
            backgroundColor={"#f5f5f5"}
        >
            <Grid item xs mr={2}>
                <TextField
                    label="Voice call URL"
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item xs="auto">
                <Fab color="success">
                    <CallIcon />
                </Fab>
            </Grid>
        </Grid>
    );
}
