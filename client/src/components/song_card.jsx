import React from "react";

export default function SongCard({ song }) {
  return (
    <div className="p-4 bg-white rounded shadow flex justify-between items-center">
      <div>
        <div className="font-medium">{song.title}</div>
        <div className="text-sm text-gray-600">{song.artist} • {song.genre}</div>
      </div>
      <div className="space-x-2">
        {song.spotify && <a href={song.spotify} target="_blank" rel="noreferrer" className="underline">Spotify</a>}
        {song.apple && <a href={song.apple} target="_blank" rel="noreferrer" className="underline">Apple</a>}
      </div>
    </div>
  );
}
