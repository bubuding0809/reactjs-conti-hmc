import React, { useState } from "react";

function VideoForm() {
  const [videoFormConfig, setVideoFormConfig] = useState({
    videoId: "",
    quality: "1080p",
  });

  function handleFormChange(event) {
    const { name, value } = event.target;
    setVideoFormConfig((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  console.log(videoFormConfig);
  return (
    <form onSubmit={() => alert("load vid")}>
      <input
        name="videoId"
        type="text"
        onChange={handleFormChange}
        value={videoFormConfig.videoId}
      />

      <input
        id="quality-1080"
        type="radio"
        value="1080p"
        name="quality"
        onChange={handleFormChange}
      />
      <label htmlFor="quality-1080">1080p</label>

      <input
        id="quality-720"
        type="radio"
        value="720p"
        name="quality"
        onChange={handleFormChange}
      />
      <label htmlFor="quality-720">720p</label>

      <input
        id="quality-360"
        type="radio"
        value="360p"
        name="quality"
        onChange={handleFormChange}
      />
      <label htmlFor="quality-360">360p</label>

      <input
        id="quality-144"
        type="radio"
        value="144"
        name="quality"
        onChange={handleFormChange}
      />
      <label htmlFor="quality-144">144p</label>

      <input
        disabled={videoFormConfig.isloadDisabled}
        type="submit"
        value="load"
      />
    </form>
  );
}

export default VideoForm;
