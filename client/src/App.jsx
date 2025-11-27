import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navigation_bar";
import Home from "./pages/home";
import MyMusic from "./pages/mymusic";
import Genres from "./pages/genres";
import Artists from "./pages/artists";
import HotTracks from "./pages/hottracks";
import SignIn from "./pages/signin";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // For now set a simple user object; backend can provide /api/me to fetch real details.
      setUser({ username: "You" });
    }
  }, []);

  const handleSignIn = (u) => setUser(u);
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <div className="app-container">
      <NavBar user={user} onSignOut={handleSignOut} />
      <main className="pt-16"> {/* padding top to account for fixed nav */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-music" element={<MyMusic />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/hottracks" element={<HotTracks />} />
          <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
        </Routes>
      </main>
    </div>
  );
}
