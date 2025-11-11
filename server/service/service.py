from server.database.database import Database as db
from server.service.user_service import user_service as user
from server.service.fav_artists_service import fav_artists_service as fav_artist
from server.service.fav_songs_service import fav_songs_service as fav_song


class Service():
    def __init__(self):
        self.db = db('music_library_db')
        self.user_service = user.UserService(self.db)
        self.fav_artists_service = fav_artist.FavArtistService(self.db)
        self.fav_songs_service = fav_song.FavSongService(self.db)
