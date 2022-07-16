import React from "react";

function VideoControls(props) {
    return (
        <div>
            <button onClick={props.setVideoPlay}>Play</button>
            <button onClick={props.setVideoPause}>Pause</button>
            <input
                id="quality-1080"
                type="radio"
                value="1080"
                name="quality"
                onChange={props.handleVideoQualityChange}
            />
            <label htmlFor="quality-1080">1080p</label>

            <input
                id="quality-720"
                type="radio"
                value="720"
                name="quality"
                onChange={props.handleVideoQualityChange}
            />
            <label htmlFor="quality-720">720p</label>

            <input
                id="quality-360"
                type="radio"
                value="360"
                name="quality"
                onChange={props.handleVideoQualityChange}
            />
            <label htmlFor="quality-360">360p</label>

            <input
                id="quality-240"
                type="radio"
                value="240"
                name="quality"
                onChange={props.handleVideoQualityChange}
            />
            <label htmlFor="quality-240">240p</label>
        </div>
    );
}

export default VideoControls;
