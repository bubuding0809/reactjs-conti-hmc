const express = require("express");
const router = express.Router();
const twilio = require("twilio");
require("dotenv").config();

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.get("/", async (req, res) => {
  try {
    const message = await client.messages.create({
      body: "Hello from ding",
      to: "+6589211925", // Text this number
      from: "+18787896623", // From a valid Twilio number
    });
    console.log(message);
    res.status(200).json({ message: "Message sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error sending message" });
  }
});

module.exports = router;
