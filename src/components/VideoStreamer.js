import React, { useEffect, useState, useRef } from "react";
import Vimeo from "@u-wave/react-vimeo";
import VideoForm from "./VideoForm";
import VideoControls from "./VideoControls";

function VideoStreamer() {
    const [videoFormConfig, setVideoFormConfig] = useState({
        videoUrl: "", // Set default video URL to empty string
        isloadDisabled: true, // Set default load button state to disabled
    });

    const [streamerConfig, setStreamerConfig] = useState({
        id: "", // Set default video ID to empty string
        videoId: "712561471", // Set default video to 712561471
        quality: "1080", // Set default quality to 1080p
        paused: true, // Set default state to paused
    });

    function setVideoPlay() {
        setStreamerConfig(prevState => {
            return {
                ...prevState,
                paused: false,
            };
        });
    }

    function setVideoPause() {
        setStreamerConfig(prevState => {
            return {
                ...prevState,
                paused: true,
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
            id: Math.random().toString(),
            videoId: videoFormConfig.videoUrl,
            quality: streamerConfig.quality,
            paused: true,
        }));
    }

    function handleVideoQualityChange(event) {
        const quality = event.target.value;

        // Update the streamer config.
        setStreamerConfig(prevState => ({
            ...prevState,
            id: Math.random().toString(),
            quality: quality,
            paused: true,
        }));
    }

    return (
        <div>
            <VideoForm
                videoFormConfig={videoFormConfig}
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit}
            />
            <Vimeo
                /* Remount the Vimeo player when the ID changes, 
                 so to ensure new video quality gets applied */
                key={streamerConfig.id}
                video={streamerConfig.videoId}
                quality={streamerConfig.quality}
                paused={streamerConfig.paused}
                responsive
            />
            <VideoControls
                setVideoPlay={setVideoPlay}
                setVideoPause={setVideoPause}
                handleVideoQualityChange={handleVideoQualityChange}
            />
        </div>
    );
}

export default VideoStreamer;
