import React, { useEffect, useState, useRef } from "react";
import Vimeo from "@u-wave/react-vimeo";
import VideoForm from "./VideoForm";
import VideoControls from "./VideoControls";
import { nanoid } from "nanoid";
import { Box } from "@mui/material";

function VideoStreamer() {
    const [videoFormConfig, setVideoFormConfig] = useState({
        videoUrl: "https://vimeo.com/712561471", // Set default video URL to empty string
    });

    const [streamerConfig, setStreamerConfig] = useState({
        id: nanoid(), // Set default video ID to empty string
        video: "https://vimeo.com/712561471", // Set default video to 712561471
        quality: "1080", // Set default quality to 1080p
        start: 0, // Set default start time to 0
        loop: true, // Set default loop to true
        paused: true, // Set default state to paused
        volume: 0, // Set default state to muted
    });

    function toggleVideoPlay() {
        setStreamerConfig(prevState => {
            return {
                ...prevState,
                paused: !prevState.paused,
            };
        });
    }

    function toggleVideoLoop() {
        setStreamerConfig(prevState => {
            return {
                ...prevState,
                loop: !prevState.loop,
            };
        });
    }

    function toggleVideoMute() {
        setStreamerConfig(prevState => {
            return {
                ...prevState,
                volume: prevState.volume === 0 ? 0.5 : 0,
            };
        });
    }

    function handleFormChange(event) {
        const { name, value } = event.target;

        // Update the form state.
        setVideoFormConfig(prevState => ({
            ...prevState,
            [name]: value,
            isloadDisabled: value ? false : true, // Disable load button if no video URL is entered
        }));
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        // Update the streamer config.
        setStreamerConfig(prevState => ({
            ...prevState,
            // Generate a random ID to be used as for the key prop to remount vimeo player
            id: nanoid(),
            video: videoFormConfig.videoUrl,
            quality: streamerConfig.quality,
            start: 0,
            paused: true,
        }));
    }

    function handleVideoQualityChange(event) {
        const quality = event.target.value;

        // Update the streamer config.
        setStreamerConfig(prevState => ({
            ...prevState,
            id: nanoid(),
            quality: quality,
        }));
    }

    function handleVideoTimeUpdate(event) {
        // Keep track of the current time of the video.
        setStreamerConfig(prevState => ({
            ...prevState,
            start: event.seconds,
        }));
    }

    return (
        <Box p={1}>
            <VideoForm
                videoFormConfig={videoFormConfig}
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit}
            />
            <Vimeo
                /* Remount the Vimeo player when the ID changes, 
                 so to ensure new video quality gets applied */
                key={streamerConfig.id}
                video={streamerConfig.video}
                quality={streamerConfig.quality}
                paused={streamerConfig.paused}
                start={streamerConfig.start}
                autoplay={!streamerConfig.paused}
                loop={streamerConfig.loop}
                volume={streamerConfig.volume}
                onTimeUpdate={handleVideoTimeUpdate}
                onEnd={() =>
                    setStreamerConfig(prevState => ({
                        ...prevState,
                        paused: true,
                    }))
                }
                controls={false}
                responsive={true}
            />
            <VideoControls
                streamerConfig={streamerConfig}
                toggleVideoPlay={toggleVideoPlay}
                toggleVideoLoop={toggleVideoLoop}
                toggleVideoMute={toggleVideoMute}
                handleVideoQualityChange={handleVideoQualityChange}
            />
        </Box>
    );
}

export default VideoStreamer;
