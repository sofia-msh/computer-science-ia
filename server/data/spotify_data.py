from server.data.spotify_client import get_spotify_client
from model import models as m

genres = [
    "pop", "rock", "hip hop", "jazz", "classical", "edm",
    "country", "afrobeat", "indie", "metal", "latin"
]


def add_songs_by_genre(database, genre, limit=10):
    sp = get_spotify_client()

    results = sp.search(q=f'genre:{genre}', type='track', limit=limit)
    for track in results['tracks']['items']:
        track_name = track['name']
        artist_name = track['artists'][0]['name']

        if database.SelectSongbyTitleAndArtist(track_name, artist_name) is not None:
            break
        else:
            exist_artist = database.SelectArtistbyName(artist_name)
            if exist_artist is not None:
                artist_id = exist_artist
            else:
                artist = m.Artist(artist_name, genre)
                artist_id = database.InsertArtist(artist)

            song = m.Song(track_name, artist_id, genre)
            database.InsertSong(song)

    print(f"Added {limit} songs from the {genre} genre.")


def populate_database(db):
    songs_per_genre = 100 // len(genres)
    for genre in genres:
        add_songs_by_genre(db, genre, limit=songs_per_genre)
