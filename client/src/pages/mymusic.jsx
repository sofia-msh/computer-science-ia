import React, { useEffect, useState } from "react";
import { getUserLibrary } from "../services/api";
import SongCard from "../components/song_card";

export default function MyMusic() {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await getUserLibrary();
        setSongs(data.songs || []);
      } catch (e) {
        setSongs([]);
      }
    })();
  }, []);
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">My Music</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {songs.length === 0 ? <div className="p-6 bg-white rounded shadow">Your library is empty.</div> : songs.map(s => <SongCard key={s.id} song={s} />)}
      </div>
    </div>
  );
}
