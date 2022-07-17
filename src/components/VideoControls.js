import React from "react";

function VideoControls(props) {
    const videoQualityOptions = ["1440", "1080", "720", "360", "240"];

    const qualityOptions = videoQualityOptions.map(quality => {
        return (
            <div className="video-options">
                <input
                    key={quality}
                    id={`video-quality-${quality}`}
                    type="radio"
                    value={quality}
                    onChange={props.handleVideoQualityChange}
                    checked={props.streamerConfig.quality === quality}
                />
                <label htmlFor={`video-quality-${quality}`}>
                    {`${quality}p`}
                </label>
            </div>
        );
    });

    return (
        <div className="vimeo-controls">
            <button onClick={props.setVideoPlay}>Play</button>
            <button onClick={props.setVideoPause}>Pause</button>
            <div className="video-options">
                <input
                    id="loop-video"
                    type="checkbox"
                    onChange={props.toggleVideoLoop}
                    checked={props.streamerConfig.loop}
                />
                <label htmlFor="loop-video">Loop</label>
            </div>
            {qualityOptions}
        </div>
    );
}

export default VideoControls;
