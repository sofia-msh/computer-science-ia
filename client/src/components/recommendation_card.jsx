import React from "react";
import { motion } from "framer-motion";

export default function RecommendationCard({ song, onAccept, onReject }) {
  if (!song) return <div>No recommendations yet.</div>;
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">{song.title}</div>
          <div className="text-sm text-gray-600">{song.artist} • {song.genre}</div>
          <div className="mt-2">Album: {song.album || "Unknown"}</div>
          <div className="mt-3 space-x-3">
            {song.spotify && <a href={song.spotify} target="_blank" rel="noreferrer" className="underline">Open on Spotify</a>}
            {song.apple && <a href={song.apple} target="_blank" rel="noreferrer" className="underline">Open on Apple Music</a>}
          </div>
        </div>
        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => onAccept(song.id)} className="px-4 py-2 bg-green-500 text-white rounded-md">Add</motion.button>
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => onReject(song.id)} className="px-4 py-2 border rounded-md">Skip</motion.button>
        </div>
      </div>
    </motion.div>
  );
}
