import { useState } from "react";
import {
  Fab,
  Grid,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";
import axios from "axios";
import FileInput from "./FileInput";

export default function FileDownloder() {
  const [destApi, setDestApi] = useState("http://localhost:3000/file_upload");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [controller, setController] = useState(new AbortController());
  const { enqueueSnackbar } = useSnackbar();

  function handleFileChange(event) {
    const files = [...event.target.files];
    setSelectedFiles((prevstate) => [...prevstate, ...files]);
  }

  async function handleFilesUpload() {
    // Configure axios post options
    const options = {
      signal: controller.signal,
      onUploadProgress: (progressEvent) => {
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
    selectedFiles.forEach((file) => {
      data.append("files", file);
    });

    enqueueSnackbar("Uploading files...", {
      variant: "info",
    });

    setIsUploading(true);

    // Post files to server
    try {
      const response = await axios.post(destApi, data, options);
      setTimeout(() => {
        console.log(response.data);
        setSelectedFiles([]);
        enqueueSnackbar("Files uploaded", {
          variant: "success",
        });
      }, 500);
    } catch (error) {
      if (axios.isCancel(error)) {
        // Display a snackbar if the request was aborted
        enqueueSnackbar("Upload cancelled", {
          variant: "warning",
        });
      } else {
        // Else if the request failed, throw an error
        console.log(error);
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      }
    }

    // Reset upload, percentage and selected files
    setTimeout(() => {
      setIsUploading(false);
      setPercentage(0);
    }, 500);
  }

  function handleRequestCancel() {
    // Call abort method on controller to terminate the request
    controller.abort();

    // Reset controller to a new instance for the next request
    setController(new AbortController());
  }

  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="flex-end"
      borderRadius={2}
      p={2}
      backgroundColor={"#f5f5f5"}
      rowGap={1}
    >
      <Typography variant="body1">File Uploader</Typography>
      <Grid item xs={12}>
        <FileInput
          id="file-upload-input"
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
          id="file-upload-field"
          label="Destination API"
          variant="outlined"
          fullWidth
          value={destApi}
          onChange={(event) => setDestApi(event.target.value)}
        />
      </Grid>
      <Grid item xs="auto" position={"relative"}>
        {isUploading ? (
          <Fab color="error" onClick={handleRequestCancel}>
            <CloseIcon />
          </Fab>
        ) : (
          <Fab
            id="file-upload-button"
            color="primary"
            onClick={handleFilesUpload}
            disabled={selectedFiles.length === 0}
          >
            <CloudUploadIcon />
          </Fab>
        )}
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
