// app imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// routes import
import appRoutes from "./routes/appRouter.mjs";

// app initializing
const app = express();

// port config
const port = process.env.PORT || 3000;

// middleware(s)
app.use(cors());
app.use(express.json());

// listening to the port
app.listen(port, () => console.log(`App is listening at Port No. ${port}`));

// invoking routes
app.use("/api", appRoutes);
