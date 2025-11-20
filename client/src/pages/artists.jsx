import { useEffect, useState } from "react";

export default function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/artists")
      .then(res => res.json())
      .then(data => setArtists(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Artists</h2>
      <ul className="list-disc pl-5">
        {artists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </div>
  );
}
