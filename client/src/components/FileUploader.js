import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
    Fab,
    Grid,
    TextField,
    Button,
    Typography,
    LinearProgress,
} from "@mui/material";
import { useState } from "react";
import FileInput from "./FileInput";
import axios from "axios";

export default function FileDownloder() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [destApi, setDestApi] = useState(
        "https://run.mocky.io/v3/445f0c6c-2e05-4710-b818-2ddeda7a08a5"
    );
    const [percentage, setPercentage] = useState(0);

    const options = {
        onUploadProgress: progressEvent => {
            const { loaded, total } = progressEvent;

            const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`${loaded}/${total}, ${percentCompleted}%`);
            setPercentage(percentCompleted);
        },
    };

    function handleFileChange(event) {
        const files = [...event.target.files];
        setSelectedFiles(prevstate => [...prevstate, ...files]);
    }

    function handleFileClear() {
        setSelectedFiles([]);
    }

    async function handleFilesUpload() {
        const data = new FormData();
        data.append("files", selectedFiles[0]);
        try {
            const response = await axios.post(destApi, data, options);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
        setTimeout(() => {
            setPercentage(0);
        }, 500);
    }

    return (
        <Grid
            container
            rowSpacing={1}
            justifyContent="space-around"
            alignItems="flex-end"
            borderRadius={2}
            p={1}
            backgroundColor={"#f5f5f5"}
        >
            <Grid item xs={12} paddingRight={0.5}>
                <FileInput
                    id="test-file-upload"
                    multiple={true}
                    onChange={handleFileChange}
                    onClear={handleFileClear}
                    variant="text"
                    files={selectedFiles}
                    text="Choose files"
                />
            </Grid>
            <Grid item xs mr={2}>
                <TextField
                    label="Destination API"
                    variant="outlined"
                    sx={{ mt: 1 }}
                    fullWidth
                    value={destApi}
                    onChange={event => setDestApi(event.target.value)}
                />
            </Grid>
            <Grid item xs="auto">
                <Fab color="primary" onClick={handleFilesUpload}>
                    <CloudUploadIcon />
                </Fab>
            </Grid>
            <Grid
                item
                container
                xs={12}
                alignItems={"center"}
                columnSpacing={1}
            >
                <Grid item xs>
                    <LinearProgress variant="determinate" value={percentage} />
                </Grid>
                <Grid item xs="auto">
                    <Typography>{percentage + "%"}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}
