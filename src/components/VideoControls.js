import {
    Grid,
    Button,
    Switch,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormLabel,
    FormGroup,
} from "@mui/material";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import LoopIcon from "@mui/icons-material/Loop";

function VideoControls(props) {
    const videoQualityOptions = ["1080", "720", "360", "240"];

    const qualityOptions = videoQualityOptions.map(quality => {
        return (
            <FormControlLabel
                key={quality}
                value={quality}
                control={<Radio size="small" />}
                label={`${quality}p`}
            />
        );
    });

    return (
        <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={2}
        >
            <Grid item xs="auto">
                <Button
                    size="large"
                    id="video-play-button"
                    variant="contained"
                    color={
                        props.streamerConfig.paused ? "primary" : "secondary"
                    }
                    onClick={props.toggleVideoPlay}
                >
                    {props.streamerConfig.paused ? (
                        <PlayArrowIcon />
                    ) : (
                        <PauseIcon />
                    )}
                </Button>
            </Grid>
            <Grid
                item
                container
                xs
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Grid item xs={6}>
                    <FormControl>
                        <FormLabel>Controls</FormLabel>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Switch
                                        size="small"
                                        onChange={props.toggleVideoLoop}
                                        checked={props.streamerConfig.loop}
                                    />
                                }
                                label={
                                    <LoopIcon
                                        color={
                                            props.streamerConfig.loop
                                                ? "primary"
                                                : "disabled"
                                        }
                                    />
                                }
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        size="small"
                                        onChange={props.toggleVideoMute}
                                        checked={props.streamerConfig.volume}
                                    />
                                }
                                label={
                                    props.streamerConfig.volume ? (
                                        <VolumeUpIcon color="primary" />
                                    ) : (
                                        <VolumeOffIcon color="disabled" />
                                    )
                                }
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid item container justifyContent={"flex-end"} xs={6}>
                    <FormControl>
                        <FormLabel id="video-playback-quality">
                            Quality options
                        </FormLabel>
                        <RadioGroup
                            row
                            value={props.streamerConfig.quality}
                            onChange={props.handleVideoQualityChange}
                        >
                            {qualityOptions}
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default VideoControls;
