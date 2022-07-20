import { Grid, Stack, Box } from "@mui/material";
import VideoStreamer from "./VideoStreamer";
import VoiceCaller from "./VoiceCaller";
import FileDownloder from "./FileDownloader";
import FileUploader from "./FileUploader";

export default function Main() {
    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <VideoStreamer />
            </Grid>
            <Grid item xs={12} md={6}>
                <Box p={3}>
                    <Stack spacing={3} justifyContent="center">
                        <VoiceCaller />
                        <FileUploader />
                        <FileDownloder />
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );
}
