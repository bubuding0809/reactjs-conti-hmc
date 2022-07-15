import React, { useEffect, useState, useRef } from "react";
import Vimeo from "@u-wave/react-vimeo";
import VideoForm from "./VideoForm";

function VideoStreamer() {
  const [streamerConfig, setStreamerConfig] = useState({
    video: "712561471",
    quality: "1080p",
    paused: false,
  });

  function setVideoPlay() {
    setStreamerConfig((prevState) => {
      return {
        ...prevState,
        paused: false,
      };
    });
  }

  function setVideoPause() {
    setStreamerConfig((prevState) => {
      return {
        ...prevState,
        paused: true,
      };
    });
  }

  return (
    <div>
      <VideoForm />
      <hr />
      <Vimeo
        video={streamerConfig.video}
        quality={streamerConfig.quality}
        paused={streamerConfig.paused}
      />
      <button onClick={setVideoPlay}>Play</button>
      <button onClick={setVideoPause}>Pause</button>
      <hr />
    </div>
  );
}

export default VideoStreamer;
