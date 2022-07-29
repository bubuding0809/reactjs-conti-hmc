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
  Typography,
} from "@mui/material";

export default function VideoControls({
  playerRef,
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

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.round(value - minute * 60);
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  return (
    <Grid
      sx={{
        borderRadius: 2,
        backgroundColor: "#f5f5f5",
        px: 2,
        py: 1,
      }}
      container
      justifyContent={"flex-start"}
      alignItems={"center"}
      columnGap={1}
    >
      {/* Video play pause buttons */}
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
      {/* Video Control switches */}
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
      {/* Video timing */}
      <Grid item xs="auto">
        <Typography minWidth={30} variant="body2" color={"text.secondary"}>
          {`${formatDuration(playerState.played)} / ${formatDuration(
            playerState.duration
          )}`}
        </Typography>
      </Grid>
      {/* Video seeker slider */}
      <Grid item container sm xs={12} alignItems="center">
        <Slider
          size="small"
          value={playerState.played}
          min={0}
          max={playerState.duration}
          onMouseDown={handleSeekStart}
          onChange={handleSeekChange}
          onChangeCommitted={handleSeekCommitted}
          valueLabelDisplay="auto"
        />
      </Grid>
    </Grid>
  );
}
