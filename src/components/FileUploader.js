import { Fab, Grid, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
                    label="Upload to path"
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item xs="auto">
                <Fab color="primary">
                    <CloudUploadIcon />
                </Fab>
            </Grid>
        </Grid>
    );
}
