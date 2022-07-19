import { Fab, Grid, TextField } from "@mui/material";
import CloudDownloadSharpIcon from "@mui/icons-material/CloudDownloadSharp";

export default function FileDownloder() {
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
                    label="Download from path"
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item xs="auto">
                <Fab color="secondary">
                    <CloudDownloadSharpIcon />
                </Fab>
            </Grid>
        </Grid>
    );
}
