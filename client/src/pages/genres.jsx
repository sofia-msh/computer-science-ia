import { useEffect, useState } from "react";

export default function Genres() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/genres")
      .then(res => res.json())
      .then(data => setGenres(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Genres</h2>
      <ul className="list-disc pl-5">
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    </div>
  );
}
