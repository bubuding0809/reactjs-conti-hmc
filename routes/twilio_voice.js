const express = require("express");
const router = express.Router();
const twilio = require("twilio");
// const ClientCapability = twilio.jwt.ClientCapability;
const VoiceResponse = twilio.twiml.VoiceResponse;
const AccessToken = require("twilio").jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

require("dotenv").config();

// Generate a Twilio Client capability token
router.get("/token", (req, res) => {
  const accessToken = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET
  );
  const grant = new VoiceGrant({
    outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID,
    incomingAllow: true,
  });
  accessToken.addGrant(grant);

  // Include token in a JSON response
  res.send({
    token: accessToken.toJwt(),
  });
});

// Create TwiML for outbound calls
router.post("/voice", (req, res) => {
  const toNumber = req.body.To;
  const callerId = process.env.TWILIO_NUMBER;
  const response = new VoiceResponse();

  // If the request to the /voice endpoint is TO your Twilio Number,
  // then it is an incoming call towards your Twilio.Device.
  if (toNumber) {
    // set the callerId
    const dial = response.dial({ callerId });
    dial.number(toNumber);

    // dial["number"]({}, toNumber);
  } else {
    response.say(
      "Thanks for calling, this is an automated message. Thank you for your email. I will be out of the office from mm/dd to mm/dd and will have limited access to email / will not have access to email. If this is urgent, please contact [NAME] at [EMAIL] or [PHONE]. I will do my best to respond promptly to your email when I return on mm/dd."
    );
  }

  res.set("Content-Type", "text/xml");
  res.send(response.toString());
});

module.exports = router;
