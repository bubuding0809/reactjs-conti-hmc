import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Fab, Grid, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import FileInput from "./FileInput";
import axios from "axios";

const api = "https://run.mocky.io/v3/445f0c6c-2e05-4710-b818-2ddeda7a08a5";

export default function FileDownloder() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [destApi, setDestApi] = useState("");
    const [percentage, setPercentage] = useState(0);

    const options = {
        onUploadProgress: progressEvent => {
            const { loaded, total } = progressEvent;

            const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`${loaded}/${total}, ${percentCompleted}%`);
            percentCompleted < 100 && setPercentage(percentCompleted);
        },
    };

    function handleFileChange(event) {
        const files = [...event.target.files];
        setSelectedFiles(prevstate => [...prevstate, ...files]);
    }

    function handleFileClear() {
        setSelectedFiles([]);
    }

    function handleFilesUpload() {
        console.log(selectedFiles[0]);
        const data = new FormData();
        data.append("files", selectedFiles[0]);
        axios.post(destApi, data, options).then(res => {
            console.log(res);
        });
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
            <Typography>{percentage + "%"}</Typography>
        </Grid>
    );
}
