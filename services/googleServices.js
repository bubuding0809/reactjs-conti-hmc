const { google } = require("googleapis");
const fs = require("fs");

const KEYFILEPATH = `${__dirname}/service-account.json`;
const SCOPES = ["https://www.googleapis.com/auth/drive"];

function authenticateGoogle() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });
  return auth;
}

async function uploadToGoogleDrive(file, auth) {
  const driveService = google.drive({ version: "v3", auth });

  const fileMetadata = {
    name: file.originalname,
    parents: ["1m-tC81BIV03opUjDESokyD5iPihWZh-O"], // Change it according to your desired parent folder id
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id",
  });

  switch (response.status) {
    case 200:
      return `File uploaded successfully to google drive: ${response.data.id}`;
    default:
      return "Unknown error uploading file to google drive";
  }
}

function deleteFile(file) {
  fs.unlink(file.path, () => {
    console.log("file deleted", file.path);
  });
}

module.exports = { authenticateGoogle, uploadToGoogleDrive, deleteFile };
