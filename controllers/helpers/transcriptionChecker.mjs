import fetch from "node-fetch";

export const transcript_checker = async (transcript_id) => {
  // preparing request payload for transcribing request to assemblyai server
  const params = {
    method: "GET",
    headers: {
      authorization: process.env.ASSEMBLY_API_KEY,
      "content-type": "application/json",
    },
  };

  // requesting for status of transcription to assemblyai server
  try {
    // request to assemblyai server and get response
    const response = await fetch(
      `https://api.assemblyai.com/v2/transcript/${transcript_id}`,
      params
    );

    // convert response to a valid json
    const data = await response.json();

    // return the json response
    return data;
  } catch (error) {
    // if error occurs while requesting to assemblyai
    return error;
  }
};
