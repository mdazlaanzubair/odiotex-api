import fetch from "node-fetch";

export const audio_transcriber = async (audio_upload_url) => {
  // preparing request payload for transcribing request to assemblyai server
  const params = {
    method: "POST",
    headers: {
      authorization: process.env.ASSEMBLY_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      audio_url: audio_upload_url,
      auto_highlights: true,
      auto_chapters: true,
      entity_detection: true,
    }),
  };

  // requesting for file transcription to assemblyai server
  try {
    // request to assemblyai server and get response
    const response = await fetch(
      "https://api.assemblyai.com/v2/transcript",
      params
    );

    // convert response to a valid json
    const data = await response.json();

    // return the json response
    return data;
  } catch (error) {
    // if error occurs while requesting to assemblyai server
    return error;
  }
};
