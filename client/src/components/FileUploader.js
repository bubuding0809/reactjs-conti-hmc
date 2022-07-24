import { useState, useRef } from "react";
import {
  Fab,
  Grid,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import FileInput from "./FileInput";

export default function FileDownloder() {
  const [destApi, setDestApi] = useState("/file_upload");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [percentage, setPercentage] = useState(0);

  function handleFileChange(event) {
    const files = [...event.target.files];
    setSelectedFiles(prevstate => [...prevstate, ...files]);
  }

  async function handleFilesUpload() {
    // Configure axios post options
    const options = {
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent;

        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`${loaded}/${total}, ${percentCompleted}%`);
        setPercentage(percentCompleted);
      },
    };

    // Create form data and append selected files to it
    const data = new FormData();
    selectedFiles.forEach(file => {
      data.append("files", file);
    });

    // Post files to server
    console.log("Uploading files...");
    setIsUploading(true);
    try {
      const response = await axios.post(destApi, data, options);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setIsUploading(false);
      setPercentage(0);
      setSelectedFiles([]);
    }, 500);
  }

  return (
    <Grid
      container
      rowSpacing={0}
      justifyContent="space-around"
      alignItems="flex-end"
      borderRadius={2}
      p={2}
      backgroundColor={"#f5f5f5"}
    >
      <Grid item xs={12}>
        <FileInput
          id="test-file-upload"
          multiple={true}
          onChange={handleFileChange}
          onClear={() => setSelectedFiles([])}
          variant="text"
          files={selectedFiles}
          text="Choose files"
        />
      </Grid>
      <Grid item xs mr={2} mt={1}>
        <TextField
          label="Destination API"
          variant="outlined"
          sx={{ mt: 1 }}
          fullWidth
          value={destApi}
          onChange={event => setDestApi(event.target.value)}
        />
      </Grid>
      <Grid item xs="auto" position={"relative"}>
        <Fab
          color="primary"
          onClick={handleFilesUpload}
          disabled={selectedFiles.length === 0 || isUploading}
        >
          <CloudUploadIcon />
        </Fab>
      </Grid>
      {isUploading && (
        <Grid
          item
          container
          xs={12}
          alignItems={"center"}
          mt={1.5}
          columnSpacing={1}
        >
          <Grid item xs>
            <LinearProgress
              color="success"
              variant="determinate"
              value={percentage}
            />
          </Grid>
          <Grid item xs="auto">
            <Typography minWidth={30} variant="body2" color={"text.secondary"}>
              {percentage + "%"}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
