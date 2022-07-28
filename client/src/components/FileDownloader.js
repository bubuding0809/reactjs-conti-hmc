import { Fab, Grid, TextField } from "@mui/material";
import CloudDownloadSharpIcon from "@mui/icons-material/CloudDownloadSharp";
import { useState } from "react";
import { useSnackbar } from "notistack";

export default function FileDownloder() {
  const [fileDownloadLink, setFileDownloadLink] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  function handleDownloadLinkChange(event) {
    const { value } = event.target;
    setFileDownloadLink(value);
  }

  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="center"
      borderRadius={2}
      p={2}
      backgroundColor={"#f5f5f5"}
    >
      <Grid item xs mr={2}>
        <TextField
          id="file-download-field"
          label="Source API"
          variant="outlined"
          fullWidth
          value={fileDownloadLink}
          onChange={handleDownloadLinkChange}
        />
      </Grid>
      <Grid item xs="auto">
        <Fab
          id="file-download-button"
          color="secondary"
          href={fileDownloadLink}
          download
          disabled={!fileDownloadLink}
          onClick={() => enqueueSnackbar("Downloading...", { variant: "info" })}
        >
          <CloudDownloadSharpIcon />
        </Fab>
      </Grid>
    </Grid>
  );
}
