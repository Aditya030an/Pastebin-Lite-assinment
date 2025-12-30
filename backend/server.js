import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
    try{
        console.log("Connected to MongoDB");
        app.listen(PORT, () =>
        console.log("Backend running on port " + PORT));
    }catch(e){
        console.log(e);
    }

});
