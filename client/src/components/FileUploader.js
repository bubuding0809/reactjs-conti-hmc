import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Fab,
  Grid,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import { useState } from "react";
import FileInput from "./FileInput";
import axios from "axios";

export default function FileDownloder() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [destApi, setDestApi] = useState("/file_upload");
  const [percentage, setPercentage] = useState(0);

  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: progressEvent => {
      const { loaded, total } = progressEvent;

      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(`${loaded}/${total}, ${percentCompleted}%`);
      setPercentage(percentCompleted);
    },
  };

  function handleFileChange(event) {
    const files = [...event.target.files];
    setSelectedFiles(prevstate => [...prevstate, ...files]);
  }

  function handleFileClear() {
    setSelectedFiles([]);
  }

  async function handleFilesUpload() {
    const data = new FormData();

    selectedFiles.forEach(file => {
      data.append("files", file);
    });

    try {
      const response = await axios.post(destApi, data, options);
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    setTimeout(() => {
      setPercentage(0);
    }, 500);
  }

  return (
    <Grid
      container
      rowSpacing={1}
      justifyContent="space-around"
      alignItems="flex-end"
      borderRadius={2}
      p={1}
      backgroundColor={"#f5f5f5"}
    >
      <Grid item xs={12} paddingRight={0.5}>
        <FileInput
          id="test-file-upload"
          multiple={true}
          onChange={handleFileChange}
          onClear={handleFileClear}
          variant="text"
          files={selectedFiles}
          text="Choose files"
        />
      </Grid>
      <Grid item xs mr={2}>
        <TextField
          label="Destination API"
          variant="outlined"
          sx={{ mt: 1 }}
          fullWidth
          value={destApi}
          onChange={event => setDestApi(event.target.value)}
        />
      </Grid>
      <Grid item xs="auto">
        <Fab
          color="primary"
          onClick={handleFilesUpload}
          disabled={selectedFiles.length === 0 || percentage > 0}
        >
          <CloudUploadIcon />
        </Fab>
      </Grid>
      <Grid item container xs={12} alignItems={"center"} columnSpacing={1}>
        <Grid item xs>
          <LinearProgress variant="determinate" value={percentage} />
        </Grid>
        <Grid item xs="auto">
          <Typography>{percentage + "%"}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
