import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import LoopIcon from "@mui/icons-material/Loop";
import {
    Grid,
    Button,
    Switch,
    FormControl,
    FormControlLabel,
    FormLabel,
    FormGroup,
    Slider,
} from "@mui/material";

export default function VideoControls({
    playerState,
    toggleVideoLoop,
    toggleVideoMute,
    toggleVideoPlay,
    handleSeekChange,
    handleSeekStart,
    handleSeekCommitted,
}) {
    return (
        <Grid
            sx={{
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
                px: 2,
                py: 1,
            }}
            container
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <Grid item xs="auto" mr={2}>
                <Button
                    size="medium"
                    id="video-play-button"
                    variant="contained"
                    color={playerState.playing ? "secondary" : "primary"}
                    onClick={toggleVideoPlay}
                >
                    {playerState.playing ? <PauseIcon /> : <PlayArrowIcon />}
                </Button>
            </Grid>
            <Grid item xs="auto">
                <FormControl>
                    <FormLabel>Controls</FormLabel>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Switch
                                    size="small"
                                    checked={playerState.loop}
                                    onChange={toggleVideoLoop}
                                />
                            }
                            label={
                                <LoopIcon
                                    color={
                                        playerState.loop
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
                                    checked={playerState.mute}
                                    onChange={toggleVideoMute}
                                />
                            }
                            label={
                                playerState.mute ? (
                                    <VolumeUpIcon color="primary" />
                                ) : (
                                    <VolumeOffIcon color="disabled" />
                                )
                            }
                        />
                    </FormGroup>
                </FormControl>
            </Grid>
            <Grid item container xs>
                <Slider
                    value={playerState.played}
                    onMouseDown={handleSeekStart}
                    onChange={handleSeekChange}
                    onChangeCommitted={handleSeekCommitted}
                />
            </Grid>
        </Grid>
    );
}
