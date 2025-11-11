from dataclasses import dataclass

@dataclass
class User():
    username: str
    email: str
    id: int | None = None
    password: str = ""

@dataclass
class Artist():
    name: str
    genre: str
    id: int | None = None

@dataclass
class Song():
    title: str
    artist_id: int
    genre: str
    id: int | None = None

@dataclass
class Fav_Artist():
    user_id: int
    artist_id: int
    id: int | None = None

@dataclass
class Fav_Song():
    user_id: int
    song_id: int
    id: int | None = None

@dataclass
class Recommendation():
    user_id: int
    song_id: int
    id: int | None = None
