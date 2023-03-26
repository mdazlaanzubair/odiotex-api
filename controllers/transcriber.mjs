import { audio_transcriber } from "./helpers/transcribeAudio.mjs";
import { upload_file_assemblyai } from "./helpers/uploader.mjs";
import { transcript_checker } from "./helpers/transcriptionChecker.mjs";

export const transcribe = async (req, res) => {
  // uploading audio file to assemblyai
  const { error, result } = await upload_file_assemblyai("./uploads/audio.mp3");

  // if - successfully uploaded transcribe audio
  if (result?.upload_url) {
    const data = await audio_transcriber(result.upload_url);
    res.status(200).send({
      transcription_id: data.id,
      msg: "Audio is submitted for transcription successfully!",
    });
  }

  // else - display error, returning res to the server
  else {
    // if = error throws by assemblyai server
    if (result?.error)
      res
        .status(500)
        .send({ error: result.error, msg: "Internal server error!" });
    // else - if error occurs while requesting to assemblyai server
    else res.status(500).send({ error, msg: "Internal server error!" });
  }
};

export const isTranscriptionDone = async (req, res) => {
  // getting transcription id from request
  const transcript_id = req.body.transcript_id;

  // getting status of transcription request
  const data = await transcript_checker(transcript_id);

  // returning response to the server based on status
  // if - queued
  if (data.status === "queued")
    res.status(200).send({
      status: "queued",
      msg: "Your request is in que, please check in a few minutes!",
    });
  // else-if - processing
  else if (data.status === "processing")
    res.status(200).send({
      status: "processing",
      msg: "Your audio is transcribing, please check in a few minutes!",
    });
  // else-if - completed
  else if (data.status === "completed")
    res.status(200).send({
      status: "completed",
      msg: "Hurrah! your transcription is completed.",
      transcription: {
        id: data.id,
        duration: data.audio_duration,
        transcript: data.text,
        words: data.words,
        keywords: data.auto_highlights_result,
        chapters: data.chapters,
        entities: data.entities,
      },
    });
  else
    res
      .status(500)
      .send({ status: data.status, msg: "Something went wrong :-(" });
};
