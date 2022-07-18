import React from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

function VideoForm(props) {
    return (
        <form onSubmit={props.handleFormSubmit}>
            <TextField
                name="videoUrl"
                type="text"
                label="Vimeo video URL"
                variant="outlined"
                size="small"
                error={!props.videoFormConfig.videoUrl}
                helperText={
                    props.videoFormConfig.videoUrl ? "" : "Please enter a URL"
                }
                onChange={props.handleFormChange}
                value={props.videoFormConfig.videoUrl}
            />

            <Button
                variant="contained"
                color="primary"
                size="medium"
                disabled={!props.videoFormConfig.videoUrl}
            >
                Load
            </Button>
        </form>
    );
}

export default VideoForm;
