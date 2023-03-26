import fetch from "node-fetch";
import multer from "multer";
import { readFileAsync } from "./fileReader.mjs";

// Define the storage engine for multer
const storage = multer.diskStorage({
  // Define the destination where the uploaded audio file will be stored
  destination: (req, file, callback) => callback(null, "uploads"),

  // Define the filename of the uploaded audio file.
  // in order to efficiently utilize the storage the file is being saved with username
  // so that if user upload new file it will replace the previous one
  filename: (req, file, callback) => callback(null, "audio.mp3"),
});

// FUNCTION 1 - to upload file on odiotex server
// Create an instance of multer using the storage engine
export const upload_file_to_server = multer({ storage }).single("user_file");

// FUNCTION 2 - to upload file on assemblyai server
export const upload_file_assemblyai = async (audioPath) => {
  // requesting for file upload to assemblyai server
  try {
    // converting audio file to stream
    const { error, data_stream } = await readFileAsync(audioPath);

    // if file successfully read and data is streamed
    if (data_stream) {
      // preparing request payload for upload request to assemblyai server
      const params = {
        method: "POST",
        headers: {
          authorization: process.env.ASSEMBLY_API_KEY,
          "Transfer-Encoding": "chunked",
        },
        // body is carrying audio file stream
        body: data_stream,
      };

      // request to assemblyai server and get response
      const response = await fetch(
        "https://api.assemblyai.com/v2/upload",
        params
      );

      // convert response to a valid json
      const result = await response.json();

      // return the json response
      return { result };
    } else {
      return { error };
    }
  } catch (error) {
    // if error occurs while requesting to assemblyai server
    return { error };
  }
};
