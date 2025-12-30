import Paste from "../models/Paste.js";
import crypto from "crypto";
import { getNow } from "../utils/time.js";

export const createPaste = async (req, res) => {
  const { content, ttl_seconds, max_views } = req.body;
  console.log("res.body", req.body);

  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Invalid content" });
  }

  if (ttl_seconds && ttl_seconds < 1) {
    return res.status(400).json({ error: "Invalid ttl_seconds" });
  }

  if (max_views && max_views < 1) {
    return res.status(400).json({ error: "Invalid max_views" });
  }

  const pasteId = crypto.randomBytes(4).toString("hex");

  const paste = await Paste.create({
    pasteId,
    content,
    expiresAt: ttl_seconds
      ? new Date(Date.now() + ttl_seconds * 1000)
      : null,
    maxViews: max_views || null
  });

  res.status(201).json({
    id: paste.pasteId,
    url: `${process.env.FRONTEND_URL}/p/${paste.pasteId}`
  });
};

export const fetchPaste = async (req, res) => {
  const paste = await Paste.findOne({ pasteId: req.params.id });
  if (!paste) return res.status(404).json({ error: "Not found" });

  const now = getNow(req);

  if (paste.expiresAt && now > paste.expiresAt) {
    return res.status(404).json({ error: "Expired" });
  }

  if (paste.maxViews && paste.views >= paste.maxViews) {
    return res.status(404).json({ error: "Expired" });
  }

  paste.views += 1;
  await paste.save();

  res.json({
    content: paste.content,
    remaining_views: paste.maxViews
      ? paste.maxViews - paste.views
      : null,
    expires_at: paste.expiresAt
  });
};
