import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ user, onSignOut }) {
  return (
    <>
      {/* spacer ensures nav sits below bookmarks bar */}
      <div className="top-nav-spacer" />
      <header className="bg-white border-b shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-2xl font-bold text-indigo-600">MusicRec</Link>
              <nav className="hidden sm:flex gap-2">
                <Link to="/" className="px-3 py-2 rounded-md hover:bg-indigo-50">Home</Link>
                <Link to="/my-music" className="px-3 py-2 rounded-md hover:bg-indigo-50">My Music</Link>
                <Link to="/genres" className="px-3 py-2 rounded-md hover:bg-indigo-50">Genres</Link>
                <Link to="/artists" className="px-3 py-2 rounded-md hover:bg-indigo-50">Artists</Link>
                <Link to="/hottracks" className="px-3 py-2 rounded-md hover:bg-indigo-50">HotTracks</Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <span className="hidden sm:inline">Hello, <strong>{user.username}</strong></span>
                  <button onClick={onSignOut} className="px-3 py-1 border rounded">Sign Out</button>
                </>
              ) : (
                <Link to="/signin" className="px-3 py-1 bg-indigo-600 text-white rounded-md">Sign In</Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
