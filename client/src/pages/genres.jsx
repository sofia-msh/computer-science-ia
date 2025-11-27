import React, { useEffect, useState } from "react";
import { getGenres } from "../services/api";
export default function Genres() {
  const [items, setItems] = useState([]);
  useEffect(() => { (async () => {
    try {
      const data = await getGenres();
      setItems(data.items || []);
    } catch (e) { setItems([]); }
  })(); }, []);
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Genres</h2>
      <div className="bg-white rounded shadow p-4">
        <ul>
          {items.sort((a,b)=>a.name.localeCompare(b.name)).map(it=>(
            <li key={it.id} className="py-2 border-b last:border-b-0 flex justify-between">
              <div>{it.name}</div>
              {it.link && <a className="underline" href={it.link} target="_blank" rel="noreferrer">Open</a>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
