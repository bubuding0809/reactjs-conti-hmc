import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import LoopIcon from "@mui/icons-material/Loop";
import BuildIcon from "@mui/icons-material/Build";
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
  handleVideoPlay,
  handleVideoPause,
  handleSeekChange,
  handleSeekStart,
  handleSeekCommitted,
}) {
  const buttonStyle = {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
  };

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
      <Grid container item xs="auto" mr={2} columnSpacing={1}>
        <Grid item xs>
          <Button
            sx={buttonStyle}
            size="medium"
            id="video-play-button"
            variant="contained"
            color="primary"
            onClick={handleVideoPlay}
          >
            <PlayArrowIcon />
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            sx={buttonStyle}
            size="medium"
            id="video-pause-button"
            variant="contained"
            color="secondary"
            onClick={handleVideoPause}
          >
            <PauseIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid item xs="auto">
        <FormControl>
          <FormLabel>Controls</FormLabel>
          <FormGroup row>
            <FormControlLabel
              sx={{
                alignItems: "flex-start",
              }}
              control={
                <Switch
                  size="small"
                  checked={playerState.loop}
                  onChange={toggleVideoLoop}
                />
              }
              label={
                <LoopIcon color={playerState.loop ? "primary" : "disabled"} />
              }
            />
            <FormControlLabel
              sx={{
                alignItems: "flex-start",
              }}
              control={
                <Switch
                  size="small"
                  checked={!playerState.muted}
                  onChange={toggleVideoMute}
                />
              }
              label={
                playerState.muted ? (
                  <VolumeOffIcon color="disabled" />
                ) : (
                  <VolumeUpIcon color="primary" />
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
