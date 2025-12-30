import mongoose from "mongoose";

export const healthCheck = async (req, res) => {
  const dbOk = mongoose.connection.readyState === 1;
  res.status(200).json({ ok: dbOk });
};
