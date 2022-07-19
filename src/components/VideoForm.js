import React from "react";
import { Grid, InputAdornment, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";

function VideoForm(props) {
    return (
        <Grid
            container
            spacing={1}
            my={1}
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <Grid item xs>
                <TextField
                    name="videoUrl"
                    type="text"
                    label="Vimeo video URL"
                    variant="outlined"
                    size="medium"
                    error={!props.videoFormConfig.videoUrl}
                    helperText={
                        props.videoFormConfig.videoUrl
                            ? ""
                            : "Please enter a URL"
                    }
                    onChange={props.handleFormChange}
                    value={props.videoFormConfig.videoUrl}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    id="video-search-button"
                                    edge="end"
                                    color="primary"
                                    disabled={!props.videoFormConfig.videoUrl}
                                    onClick={props.handleFormSubmit}
                                >
                                    <YoutubeSearchedForIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default VideoForm;
