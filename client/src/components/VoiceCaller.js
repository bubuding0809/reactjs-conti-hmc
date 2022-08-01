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
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import axios from "axios";

export default function VoiceCaller() {
  const [isDeviceReady, setIsDeviceReady] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callDevice, setCallDevice] = useState(null);
  const [callInstance, setCallInstance] = useState(null);
  const [clientIdentity, setClientIdentity] = useState("");
  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [callAudio, setCallAudio] = useState({
    inputVol: 0,
    outputVol: 0,
  });

  async function startupClient() {
    console.log("Requesting access token...");

    try {
      // Get the device token from the server
      const response = await axios.get("/twilio_voice/token");
      console.log("Got access token");
      const token = response.data.token;
      console.log(response);

      // Display client name on UI
      setClientIdentity(response.data.identity);

      // Create a Twilio.Device instance with token
      console.log("Initializing device");

      const device = new Device(token, {
        logLevel: 1,
        // Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
        // providing better audio quality in restrained network conditions.
        codecPreferences: ["opus", "pcmu"],
      });
      console.log(device);
      // Add listeners for device events
      addDeviceListeners(device);

      // Device must be registered in order to receive incoming calls
      device.register();

      //Update state
      setCallDevice(device);
      setIsDeviceReady(true);

      // Device must be registered in order to receive incoming calls
      // device.register();
    } catch (error) {
      console.log(error);
    }
  }

  function addDeviceListeners(device) {
    device.on("registered", () =>
      console.log("The device is ready to receive incoming calls.")
    );
    device.on("error", error => {
      console.log("Twilio.Device Error: " + error);
    });
    device.on("incoming", call => {
      console.log(call);
      console.log(`Incoming call from ${call.parameters.From}`);
      setIsIncomingCall(true);

      // add event listener to call object
      addCallListeners(call);

      setCallInstance(call);
    });
  }

  function addCallListeners(call) {
    call.on("accept", () => console.log("Call connected"));
    call.on("cancel", () => console.log("Call cancelled"));
    call.on("reject", () => console.log("Call rejected."));
    call.on("error", error => console.log("Call error", error));
    call.on("volume", (inputVol, outputVol) =>
      setCallAudio({ inputVol, outputVol })
    );
    call.on("disconnect", () => {
      console.log("Call disconnected");
      callDevice.destroy();
      setCallDevice(null);
      setCallInstance(null);
      setIsDeviceReady(false);
      setClientIdentity("");
      setCallAudio({ inputVol: 0, outputVol: 0 });
    });
  }

  async function handleOutgoingCall() {
    if (!isDeviceReady) {
      console.log("call device not setup");
      return;
    }

    console.log("Attempting to call" + phoneNumber);
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

  function acceptIncomingCall() {
    if (!callInstance) {
      console.log("No call to accept");
      return;
    }
    setIsIncomingCall(false);
    callInstance.accept();
    console.log("Accepted incoming call");
  }

  function rejectIncomingCall() {
    if (!callInstance) {
      console.log("No call to reject");
      return;
    }
    setIsIncomingCall(false);
    callInstance.reject();
    console.log("Rejected incoming call");
  }

  function hangupCall() {
    if (!callInstance) {
      console.log("No call to hangup");
      return;
    }
    setIsIncomingCall(false);
    callInstance.disconnect();
    console.log("Hanging up incoming call");
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
      <Grid item container xs={12} alignItems="center">
        <Grid item xs="auto">
          <Button onClick={startupClient}>Setup device</Button>
        </Grid>
        <Grid item xs>
          <Typography variant="body2" fontSize={13}>
            {clientIdentity}
          </Typography>
        </Grid>
        {isIncomingCall && (
          <>
            <Grid item xs="auto">
              <Button onClick={acceptIncomingCall}>Accept</Button>
            </Grid>
            <Grid item xs="auto">
              <Button onClick={rejectIncomingCall}>Reject</Button>
            </Grid>
          </>
        )}
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
        <Fab color="error" onClick={hangupCall} disabled={!isDeviceReady}>
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
              height: 20,
              borderRadius: 1.5,
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
              height: 20,
              borderRadius: 1.5,
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
