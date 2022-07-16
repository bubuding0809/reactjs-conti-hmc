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

            <input
                disabled={props.videoFormConfig.isloadDisabled}
                type="submit"
                value="load"
            />
        </form>
    );
}

export default VideoForm;
