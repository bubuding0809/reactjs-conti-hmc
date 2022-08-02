import React from "react";
import { InputAdornment, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";

function VideoForm({ playerUrl, setPlayerUrl, handleLoad }) {
  return (
    <TextField
      id="video-url-input"
      name="videoUrl"
      type="text"
      label="Video URL"
      variant="outlined"
      size="medium"
      error={!playerUrl}
      helperText={playerUrl ? "" : "Please enter a URL"}
      onChange={(e) => setPlayerUrl(e.target.value)}
      value={playerUrl}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              id="video-search-button"
              edge="end"
              color="primary"
              disabled={!playerUrl}
              onClick={handleLoad}
            >
              <YoutubeSearchedForIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default VideoForm;
