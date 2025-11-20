import { useEffect, useState } from "react";

export default function HotTracks() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/hottracks")
      .then(res => res.json())
      .then(data => setTracks(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Hot Tracks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tracks.map((track) => (
          <div key={track.id} className="p-4 bg-white shadow rounded">
            <h3 className="font-semibold">{track.title}</h3>
            <p className="text-gray-600">{track.artist}</p>
            <a
              href={track.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2 inline-block"
            >
              Listen
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
