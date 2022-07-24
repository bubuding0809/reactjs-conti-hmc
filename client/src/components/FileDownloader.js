import { Fab, Grid, TextField } from "@mui/material";
import CloudDownloadSharpIcon from "@mui/icons-material/CloudDownloadSharp";
import { useState } from "react";

export default function FileDownloder() {
    const [fileDownloadLink, setFileDownloadLink] = useState("");

    function handleDownloadLinkChange(event) {
        const { value } = event.target;
        setFileDownloadLink(value);
    }

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
                    id="file-download-field"
                    label="Source API"
                    variant="outlined"
                    fullWidth
                    value={fileDownloadLink}
                    onChange={handleDownloadLinkChange}
                />
            </Grid>
            <Grid item xs="auto">
                <Fab
                    id="file-download-button"
                    color="secondary"
                    href={fileDownloadLink}
                    download
                    disabled={!fileDownloadLink}
                >
                    <CloudDownloadSharpIcon />
                </Fab>
            </Grid>
        </Grid>
    );
}
