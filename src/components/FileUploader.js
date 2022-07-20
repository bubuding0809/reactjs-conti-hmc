import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Fab, Grid, TextField, Button, Typography } from "@mui/material";
import VirtualizedList from "./VirtualizedList";
import { useState } from "react";
import FileInput from "./FileInput";

export default function FileDownloder() {
    const [selectedFiles, setSelectedFiles] = useState([]);

    function handleFileChange(event) {
        const files = [...event.target.files];
        setSelectedFiles((prevstate) => [...prevstate, ...files]);
    }

    function handleFileClear() {
        setSelectedFiles([]);
    }

    return (
        <Grid
            container
            justifyContent="space-around"
            alignItems="flex-end"
            borderRadius={2}
            p={1}
            backgroundColor={"#f5f5f5"}
        >
            <Grid item xs={12}>
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
