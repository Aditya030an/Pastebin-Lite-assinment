"use client";

import { useState } from "react";

export default function HomePage() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const createPaste = async () => {
    try {
      const payload = {
      content,
      ttl_seconds: Number(ttl),
      max_views: Number(maxViews),
    };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pastes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON returned from server");
      }

      if (!res.ok) throw new Error(data.error || "Failed to create paste");

      setContent("");
      setTtl("");
      setMaxViews("");
      setLink(data.url);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <main>
      <h1>Pastebin Lite</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <textarea
        rows={8}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter paste content *"
      />

      <br />

      <input
        type="number"
        placeholder="TTL (seconds) *"
        value={ttl}
        onChange={(e) => setTtl(e.target.value)}
        min="1"
      />

      <br />

      <input
        type="number"
        placeholder="Max Views *"
        value={maxViews}
        onChange={(e) => setMaxViews(e.target.value)}
        min="1"
      />

      <br />

      <button onClick={createPaste}>Create Paste</button>

      {link && (
        <p>
          Share link:{" "}
          <a href={link} target="_blank" rel="noreferrer">
            {link}
          </a>
        </p>
      )}
    </main>
  );
}
