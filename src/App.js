import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import VideoStreamer from "./components/VideoStreamer";

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <VideoStreamer />
    </div>
  );
}

export default App;
