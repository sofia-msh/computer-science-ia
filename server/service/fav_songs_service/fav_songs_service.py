from server.database.database import Database
from model import models as m

class FavSongService():
    def __init__(self, db: Database):
        self.db = db

    def InsertIntoFavSongs(self, user_id, song_name, artist_name):
        song_id = self.db.SelectSongbyTitleAndArtist(song_name, artist_name)
        if song_id is None:
            return None
        song = m.Fav_Song(user_id=user_id, song_id=song_id)
        self.db.InsertIntoFavSongs(song)
        return True

    def DeleteFromFavSongs(self, user_id, song_name, artist_name):
        song_id = self.db.SelectSongbyTitleAndArtist(song_name, artist_name)
        if song_id is None:
            return None
        song = m.Fav_Song(user_id=user_id, song_id=song_id)
        self.db.DeleteFromFavSongs(song)
        return True

    def SelectGenreFromFavSongs(self, song_name, artist_name):
        song_id = self.db.SelectSongbyTitleAndArtist(song_name, artist_name)
        genre = self.db.SelectGenre(song_id)
        return genre
