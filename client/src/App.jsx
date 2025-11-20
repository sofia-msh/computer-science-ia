import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import MyMusic from "./pages/mymusic.jsx";
import Genres from "./pages/genres.jsx";
import Artists from "./pages/artists.jsx";
import HotTracks from "./pages/hottracks.jsx";
import SignIn from "./pages/signin.jsx";
import Navbar from "./components/navigation_bar";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mymusic" element={<MyMusic />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/hottracks" element={<HotTracks />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}
