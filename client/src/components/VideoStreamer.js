import React, { useState, useRef } from "react";
import VideoForm from "./VideoForm";
import VideoControls from "./VideoControls";
import ReactPlayer from "react-player";
import { Box, Stack, Grid } from "@mui/material";
import { useSnackbar } from "notistack";

function VideoStreamer() {
  const { enqueueSnackbar } = useSnackbar();

  // Create a ref to store the video player instance
  const playerRef = useRef();

  // Create url state for video url form
  const [playerUrl, setPlayerUrl] = useState("https://vimeo.com/712561471");

  // Create state for video player
  const [playerState, setPlayerState] = useState({
    url: "https://vimeo.com/712561471",
    playing: false,
    controls: false,
    played: 0,
    volume: 0.5,
    muted: true,
    loop: true,
    playbackRate: 1,
    seeking: false,
    duration: 0,
    playsinline: true,
  });

  // Create state to store previous player state
  const [prevPlaying, setPrevPlaying] = useState(false);

  // Create a prop object for video form
  const formProps = {
    playerUrl,
    setPlayerUrl,
    handleLoad: () => {
      setPlayerState((prevState) => ({
        ...prevState,
        url: playerUrl,
      }));
    },
  };

  // Create a prop object for video player
  const playerProps = {
    ...playerState,
    ref: playerRef,
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "black",
    },
    width: "100%",
    height: "100%",
    onReady: (player) => {
      enqueueSnackbar("Successfully loaded video", {
        variant: "success",
      });
      console.log("onReady", player);
    },
    onError: (error) => {
      enqueueSnackbar("Error loading video", { variant: "error" });
      console.log("onError", error);
    },
    onDuration: (duration) => {
      setPlayerState((prevState) => ({
        ...prevState,
        duration: duration,
      }));
    },
    onProgress: (state) => {
      if (!playerState.seeking) {
        setPlayerState((prevState) => ({
          ...prevState,
          played: state.playedSeconds,
        }));
      }
    },
    onEnded: () => {
      setPlayerState((prevState) => ({
        ...prevState,
        playing: prevState.loop,
      }));
    },
  };

  // Create a prop object for video controls
  const controlProps = {
    playerRef,
    playerState,
    toggleVideoLoop: () => {
      setPlayerState((prevState) => ({
        ...prevState,
        loop: !prevState.loop,
      }));
    },
    toggleVideoMute: () => {
      setPlayerState((prevState) => ({
        ...prevState,
        muted: !prevState.muted,
      }));
    },
    handleVideoPlay: () => {
      setPlayerState((prevState) => ({
        ...prevState,
        playing: true,
      }));
    },
    handleVideoPause: () => {
      setPlayerState((prevState) => ({
        ...prevState,
        playing: false,
      }));
    },
    handleSeekStart: (e) => {
      setPrevPlaying(playerState.playing);
      setPlayerState((prevState) => ({
        ...prevState,
        seeking: true,
        playing: false,
      }));
    },
    handleSeekChange: (e) => {
      setPlayerState((prevState) => ({
        ...prevState,
        played: parseFloat(e.target.value),
      }));
    },
    handleSeekCommitted: (e, value) => {
      playerRef.current.seekTo(parseFloat(e.target.value));
      setPlayerState((prevState) => ({
        ...prevState,
        seeking: false,
        playing: prevPlaying,
      }));
    },
  };

  return (
    <Box p={3}>
      <Stack spacing={1}>
        <VideoForm {...formProps} />
        <Box
          sx={{
            position: "relative",
            paddingTop: "56.25%",
          }}
        >
          <ReactPlayer {...playerProps} />
        </Box>
        <VideoControls {...controlProps} />
      </Stack>
    </Box>
  );
}

export default VideoStreamer;
