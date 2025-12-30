import express from "express";
import cors from "cors";
import pasteRoutes from "./routes/paste.routes.js";
import healthRoutes from "./routes/health.routes.js";

const app = express();

app.use(cors(
    {
        origin: "*"
    }
));
app.use(express.json());

app.use("/api/healthz", healthRoutes);
app.use("/api/pastes", pasteRoutes);

app.use("/" , (req , res)=>{
    res.send("Welcome to Pastebin Lite backend")
})

export default app;
