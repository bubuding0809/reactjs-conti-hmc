import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import VideoStreamer from "./components/VideoStreamer";

function App() {
    return (
        <div>
            <h1>HMC Tester</h1>
            <hr />
            <VideoStreamer />
        </div>
    );
}

export default App;
