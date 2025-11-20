import { useEffect, useState } from "react";

export default function MyMusic() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/mymusic")
      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">My Music</h2>
      {songs.length === 0 ? (
        <p>No songs added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {songs.map((song) => (
            <div key={song.id} className="p-4 bg-white shadow rounded">
              <h3 className="font-semibold">{song.title}</h3>
              <p className="text-gray-600">{song.artist}</p>
              <a
                href={song.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2 inline-block"
              >
                Listen
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
