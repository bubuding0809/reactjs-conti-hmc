import { useState } from "react";
import {
  Button,
  Fab,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Device } from "@twilio/voice-sdk";
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import axios from "axios";

export default function VoiceCaller() {
  const [isDeviceReady, setIsDeviceReady] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callDevice, setCallDevice] = useState(null);
  const [callInstance, setCallInstance] = useState(null);
  const [callAudio, setCallAudio] = useState({
    inputVol: 0,
    outputVol: 0,
  });

  function addDeviceListeners(device) {
    device.on("registered", () =>
      console.log("The device is ready to receive incoming calls.")
    );
    device.on("error", error => {
      console.log("Twilio.Device Error: " + error);
    });
  }

  function addCallListeners(call) {
    call.on("accept", () => console.log("Call connected"));
    call.on("cancel", () => console.log("Call cancelled"));
    call.on("error", error => console.log("Call error", error));
    call.on("volume", (inputVol, outputVol) =>
      setCallAudio({ inputVol, outputVol })
    );
    call.on("disconnect", () => {
      callDevice.destroy();
      setCallDevice(null);
      setCallInstance(null);
      setIsDeviceReady(false);
      setCallAudio({ inputVol: 0, outputVol: 0 });
    });
  }

  function handleHangUp() {
    if (!callInstance) {
      console.log("No call to hangup");
      return;
    }

    callInstance.disconnect();
  }

  async function setupDevice() {
    try {
      // Get the device token from the server
      const response = await axios.get("/twilio_voice/token");
      const token = response.data.token;

      // Create a Twilio.Device instance with token
      const device = new Device(token, {
        codecPreferences: ["opus", "pcmu"],
      });

      // Add listeners for device events
      addDeviceListeners(device);

      //Update state
      setCallDevice(device);
      setIsDeviceReady(true);

      // Device must be registered in order to receive incoming calls
      // device.register();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleOutgoingCall() {
    if (!isDeviceReady) {
      console.log("call device not setup");
      return;
    }

    try {
      const call = await callDevice.connect({
        params: {
          To: phoneNumber,
        },
      });
      setCallInstance(call);
      addCallListeners(call);
    } catch (e) {
      console.log(e);
    }
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
      <Typography variant="body1">Voice Caller</Typography>
      <Grid item xs={12}>
        <Button onClick={setupDevice}>Setup device</Button>
      </Grid>
      <Grid item xs mr={2}>
        <TextField
          label="Number / Client"
          variant="outlined"
          onChange={e => setPhoneNumber(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs="auto" mr={1}>
        <Fab
          color="success"
          onClick={handleOutgoingCall}
          disabled={!isDeviceReady}
        >
          <CallIcon />
        </Fab>
      </Grid>
      <Grid item xs="auto">
        <Fab color="error" onClick={handleHangUp} disabled={!isDeviceReady}>
          <CallEndIcon />
        </Fab>
      </Grid>
      <Grid item container alignItems="center" xs={12} columnGap={1}>
        <Grid item container xs="auto">
          <MicIcon />
        </Grid>
        <Grid item xs>
          <LinearProgress
            sx={{
              height: 10,
            }}
            color="primary"
            variant="determinate"
            value={callAudio.outputVol * 100}
          />
        </Grid>
      </Grid>
      <Grid item container alignItems="center" xs={12} columnGap={1}>
        <Grid item container xs="auto">
          <PhoneInTalkIcon />
        </Grid>
        <Grid item xs>
          <LinearProgress
            sx={{
              height: 10,
            }}
            color="secondary"
            variant="determinate"
            value={callAudio.inputVol * 100}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
