import { Divider, Grid, Stack } from "@mui/material";
import { Box, Container } from "@mui/system";
import "./App.css";
import Header from "./components/Header";
import VideoStreamer from "./components/VideoStreamer";
import VoiceCaller from "./components/VoiceCaller";
import FileDownloder from "./components/FileDownloader";
import FileUploader from "./components/FileUploader";

function App() {
    return (
        <Box>
            <Header />
            <hr />
            <Grid container>
                <Grid item xs={12} md={6} border={"1px dotted black"}>
                    <VideoStreamer />
                </Grid>
                <Grid item xs={12} md={6} border={"1px dotted black"}>
                    <Box p={3}>
                        <Stack spacing={3} justifyContent="center">
                            <VoiceCaller />
                            <FileUploader />
                            <FileDownloder />
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={12} border={"1px dotted black"}>
                    <Box height={{ xs: "30vh" }}>Server Utilities</Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default App;
