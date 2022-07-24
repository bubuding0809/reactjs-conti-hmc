import React, { useState, useRef, useEffect } from "react";
import VideoForm from "./VideoForm";
import VideoControls from "./VideoControls";
import ReactPlayer from "react-player";
import { Box, Stack } from "@mui/material";
import { usePrevious } from "./hooks";

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

    const controlProps = {
        playerRef,
        playerState,
        toggleVideoPlay: () => {
            setPlayerState(prevState => ({
                ...prevState,
                playing: !prevState.playing,
            }));
        },
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
        handleSeekStart: e => {
            setPlayerState(prevState => ({
                ...prevState,
                seeking: true,
            }));
        },
        handleSeekChange: e => {
            setPlayerState(prevState => ({
                ...prevState,
                played: parseFloat(e.target.value),
            }));
            playerRef.current.seekTo(
                parseFloat(e.target.value) / 100,
                "fraction"
            );
        },

        handleSeekCommitted: e => {
            setPlayerState(prevState => ({
                ...prevState,
                seeking: false,
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
