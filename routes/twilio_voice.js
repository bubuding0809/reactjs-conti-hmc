const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;
const AccessToken = require("twilio").jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;
// const { v4: uuidv4 } = require("uuid");
const nameGenerator = require("../name_generator");

require("dotenv").config();

var identity;

/**
 * Checks if the given value is valid as phone number
 * @param {Number|String} number
 * @return {Boolean}
 */
function isAValidPhoneNumber(number) {
  // Check if the given value is a valid phone number
  // return true if it is, false otherwise
  return /^[\d\+\-\(\) ]+$/.test(number);
}

// Generate an access token for a Twilio Client Application
router.get("/token", (req, res) => {
  // Generate a unique identifier for the client
  identity = nameGenerator();

  // Generate an access token that we will sign and return to the client
  const accessToken = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET,
    { identity: identity }
  );

  // // Assign a unqiue identity to the access token
  // accessToken.identity = identity;

  const grant = new VoiceGrant({
    outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID,
    incomingAllow: true,
  });
  accessToken.addGrant(grant);

  // Include token in a JSON response
  res.send({
    identity: identity,
    token: accessToken.toJwt(),
  });
});

// Create TwiML for outbound calls
router.post("/voice", (req, res) => {
  const reciever = req.body.To;
  const callerId = process.env.TWILIO_NUMBER;
  const response = new VoiceResponse();

  // If the request to the /voice endpoint is TO your Twilio Number,
  // then it is an incoming call towards your Twilio.Device.
  if (reciever === callerId) {
    console.log("Incoming call from " + reciever + " to " + identity);
    const dial = response.dial();

    dial.client(identity);
  } else if (reciever) {
    console.log("Outgoing call to " + reciever);
    // set the callerId
    const dial = response.dial({ callerId });

    // Check if the 'To' parameter is a Phone Number or Client Name
    // in order to use the appropriate TwiML noun
    const attr = isAValidPhoneNumber(reciever) ? "number" : "client";
    console.log(attr);
    dial[attr]({}, reciever);
  } else {
    console.log("No reciever specified");
    response.say(
      "Thanks for calling, this is an automated message. You have not entered a phone number while dialing hence you are hearing this. This is a automated test message. Thank you for your call. "
    );
  }

  res.set("Content-Type", "text/xml");
  res.send(response.toString());
});

module.exports = router;
