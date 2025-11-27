const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000"; // set in .env if needed

function getHeaders() {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function apiFetch(path, opts = {}) {
  const res = await fetch(API_BASE + path, {
    headers: getHeaders(),
    ...opts
  });
  if (res.status === 401) {
    // unauthorized — clear token
    localStorage.removeItem("token");
    throw new Error("unauthorized");
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Error");
    return data;
  } else {
    if (!res.ok) throw new Error("Error");
    return res;
  }
}

// Auth
export function login(username, password) {
  return apiFetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password })
  });
}

// Library & songs
export function getUserLibrary() {
  return apiFetch("/api/user/library");
}
export function getGenres() {
  return apiFetch("/api/genres");
}
export function getArtists() {
  return apiFetch("/api/artists");
}
export function getHotTracks() {
  return apiFetch("/api/hottracks");
}

// Recommendation endpoints (backend can implement genre algorithm)
export function getRecommendation() {
  return apiFetch("/api/recommendation");
}
export function acceptRecommendation(songId) {
  return apiFetch("/api/recommendation/accept", { method: "POST", body: JSON.stringify({ songId }) });
}
export function rejectRecommendation(songId) {
  return apiFetch("/api/recommendation/reject", { method: "POST", body: JSON.stringify({ songId }) });
}

// Fallback client-side genre-based recommender (if backend not ready)
export async function clientSideRecommendByGenre(preferredGenres = [], allSongs = []) {
  if (!preferredGenres || preferredGenres.length === 0) return null;
  // find songs matching genre not already in library (allSongs expected contains {id, title, artist, genre})
  const pool = allSongs.filter(s => preferredGenres.includes(s.genre));
  if (pool.length === 0) return null;
  // pick random from pool
  return pool[Math.floor(Math.random() * pool.length)];
}
