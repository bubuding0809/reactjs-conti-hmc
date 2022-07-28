import React, { useState, useRef } from "react";
import VideoForm from "./VideoForm";
import VideoControls from "./VideoControls";
import ReactPlayer from "react-player";
import { Box, Stack } from "@mui/material";

function VideoStreamer() {
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
  });

  // Create state to store previous player state
  const [prevPlaying, setPrevPlaying] = useState(false);

  // Create a prop object for video form
  const formProps = {
    playerUrl,
    setPlayerUrl,
    handleLoad: () => {
      setPlayerState(prevState => ({
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
    onEnded: () => {
      setPlayerState(prevState => ({
        ...prevState,
        playing: prevState.loop,
      }));
    },
    onProgress: state => {
      if (!playerState.seeking) {
        setPlayerState(prevState => ({
          ...prevState,
          played: state.played * 100,
        }));
      }
    },
  };

  // Create a prop object for video controls
  const controlProps = {
    playerRef,
    playerState,
    toggleVideoLoop: () => {
      setPlayerState(prevState => ({
        ...prevState,
        loop: !prevState.loop,
      }));
    },
    toggleVideoMute: () => {
      setPlayerState(prevState => ({
        ...prevState,
        muted: !prevState.muted,
      }));
    },
    handleVideoPlay: () => {
      setPlayerState(prevState => ({
        ...prevState,
        playing: true,
      }));
    },
    handleVideoPause: () => {
      setPlayerState(prevState => ({
        ...prevState,
        playing: false,
      }));
    },
    handleSeekStart: e => {
      setPrevPlaying(playerState.playing);
      setPlayerState(prevState => ({
        ...prevState,
        seeking: true,
        playing: false,
      }));
    },
    handleSeekChange: e => {
      setPlayerState(prevState => ({
        ...prevState,
        played: parseFloat(e.target.value),
      }));
    },
    handleSeekCommitted: (e, value) => {
      console.log(e);
      playerRef.current.seekTo(parseFloat(value) / 100, "fraction");
      setPlayerState(prevState => ({
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
