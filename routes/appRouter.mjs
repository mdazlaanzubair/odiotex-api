import express from "express";
import { upload_file_to_server } from "../controllers/helpers/uploader.mjs";
import { isTranscriptionDone, transcribe } from "../controllers/transcriber.mjs";

// invoking express router
const router = express.Router();

// routes to transcriber controller
router.post("/transcribe", upload_file_to_server, transcribe);
router.post("/transcript/check", isTranscriptionDone);

// exporting router
export default router;
