import React, { useState, useRef } from "react";
import VideoForm from "./VideoForm";
import VideoControls from "./VideoControls";
import ReactPlayer from "react-player";
import { Box, Stack } from "@mui/material";

function VideoStreamer() {
  const playerRef = useRef();

  const [playerUrl, setPlayerUrl] = useState("https://vimeo.com/712561471");

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

  const handleForm = {
    playerUrl,
    setPlayerUrl,
    handleLoad: () => {
      setPlayerState((prevState) => ({
        ...prevState,
        url: playerUrl,
      }));
    },
  };

  const handleVideo = {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "black",
    },

    width: "100%",

    height: "100%",

    ref: playerRef,

    onEnded: () => {
      setPlayerState((prevState) => ({
        ...prevState,
        playing: prevState.loop,
      }));
    },

    onProgress: (state) => {
      if (!playerState.seeking) {
        setPlayerState((prevState) => ({
          ...prevState,
          played: state.played * 100,
        }));
      }
    },
  };

  const handleControls = {
    playerRef,

    toggleVideoPlay: () => {
      setPlayerState((prevState) => ({
        ...prevState,
        playing: !prevState.playing,
      }));
    },

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

    handleSeekChange: (e) => {
      setPlayerState((prevState) => ({
        ...prevState,
        played: parseFloat(e.target.value),
      }));
      playerRef.current.seekTo(parseFloat(e.target.value) / 100, "fraction");
    },

    handleSeekStart(e) {
      console.log("seeking", e.target);
      setPlayerState((prevState) => ({
        ...prevState,
        seeking: true,
      }));
    },

    handleSeekCommitted: (e) => {
      console.log("stop seeking");
      setPlayerState((prevState) => ({
        ...prevState,
        seeking: false,
      }));
    },
  };

  return (
    <Box p={3}>
      <Stack spacing={1}>
        <VideoForm {...handleForm} />
        <Box
          sx={{
            position: "relative",
            paddingTop: "56.25%",
          }}
        >
          <ReactPlayer {...playerState} {...handleVideo} />
        </Box>
        <VideoControls playerState={playerState} {...handleControls} />
      </Stack>
    </Box>
  );
}

export default VideoStreamer;
