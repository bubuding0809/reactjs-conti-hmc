import React from "react";

function VideoForm(props) {
    return (
        <form onSubmit={props.handleFormSubmit}>
            <input
                name="videoUrl"
                type="text"
                onChange={props.handleFormChange}
                value={props.videoFormConfig.videoUrl}
            />

            <button disabled={!props.videoFormConfig.videoUrl} type="submit">
                Load
            </button>
        </form>
    );
}

export default VideoForm;
