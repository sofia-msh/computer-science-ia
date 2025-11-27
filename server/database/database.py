import sqlite3
from model import models as m


class Database():

    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name, check_same_thread=False)
        self.cursor = self.conn.cursor()

    def CreateTableUsers(self):
        sql_code = ("CREATE TABLE if not exists users ("
                    "user_id INTEGER PRIMARY KEY," +
                    "username TEXT," +
                    "email TEXT," +
                    "password TEXT" +
                    ");")
        self.cursor.execute(sql_code)

    def CreateTableArtists(self):
        sql_code = ("CREATE TABLE if not exists artists("
                    "artist_id INTEGER PRIMARY KEY," +
                    "artist_name TEXT," +
                    "genre TEXT" +
                    ");")
        self.cursor.execute(sql_code)

    def CreateTableSongs(self):
        sql_code = ("CREATE TABLE if not exists songs("
                    "id INTEGER PRIMARY KEY," +
                    "title TEXT," +
                    "artist_id INTEGER," +
                    "genre TEXT," +
                    "spotify_url TEXT," +
                    "apple_url TEXT," +
                    "FOREIGN KEY (artist_id) REFERENCES artists(artist_id)," +
                    "UNIQUE(title, artist_id)" +
                    ");")
        self.cursor.execute(sql_code)

    def CreateTableFavoriteArtists(self):
        sql_code = ("CREATE TABLE if not exists fav_artists("
                    "id INTEGER PRIMARY KEY," +
                    "user_id INTEGER," +
                    "artist_id INTEGER," +
                    "FOREIGN KEY (user_id) REFERENCES user(user_id)," +
                    "FOREIGN KEY (artist_id) REFERENCES artists(artist_id)" +
                    ");")
        self.cursor.execute(sql_code)

    def CreateTableFavoriteSongs(self):
        sql_code = ("CREATE TABLE if not exists fav_songs("
                    "id INTEGER PRIMARY KEY," +
                    "user_id INTEGER," +
                    "song_id INTEGER," +
                    "FOREIGN KEY (user_id) REFERENCES user(user_id)," +
                    "FOREIGN KEY (song_id) REFERENCES songs(id)" +
                    ");")
        self.cursor.execute(sql_code)

    def CreateTableRecommendations(self):
        sql_code = ("CREATE TABLE if not exists recommendations("
                    "id INTEGER PRIMARY KEY," +
                    "user_id INTEGER," +
                    "song_id INTEGER," +
                    "FOREIGN KEY (user_id) REFERENCES user(user_id)," +
                    "FOREIGN KEY (song_id) REFERENCES songs(id)" +
                    ");")
        self.cursor.execute(sql_code)

    def CreateAllTables(self):
        self.CreateTableUsers()
        self.CreateTableArtists()
        self.CreateTableSongs()
        self.CreateTableFavoriteArtists()
        self.CreateTableFavoriteSongs()
        self.CreateTableRecommendations()

    def DropAllTables(self):
        sql_code1 = "DROP TABLE if exists users"
        sql_code2 = "DROP TABLE if exists artists"
        sql_code3 = "DROP TABLE if exists songs"
        sql_code4 = "DROP TABLE if exists fav_artists"
        sql_code5 = "DROP TABLE if exists fav_songs"
        sql_code6 = "DROP TABLE if exists recommendations"
        queries = [sql_code1, sql_code2, sql_code3, sql_code4, sql_code5, sql_code6]
        for i in queries:
            self.cursor.execute(i)

    def InsertArtist(self, artist: m.Artist):
        sql_code = "INSERT INTO artists (artist_name, genre) VALUES (?,?) returning artist_id"
        values = (artist.name, artist.genre)
        self.cursor.execute(sql_code, values)
        id = self.cursor.fetchone()
        self.conn.commit()
        return id[0]

    def InsertSong(self, song: m.Song):
        sql_code = "INSERT INTO songs (title, artist_id, genre) VALUES (?,?,?)"
        values = (song.title, song.artist_id, song.genre)
        self.cursor.execute(sql_code, values)
        self.conn.commit()

    def InsertIntoFavSongs(self, fav_song: m.Fav_Song):
        sql_code = "INSERT INTO fav_songs (user_id, song_id) VALUES (?,?)"
        values = (fav_song.user_id, fav_song.song_id)
        self.cursor.execute(sql_code, values)
        self.conn.commit()

    def InsertIntoFavArtists(self, fav_artist: m.Fav_Artist):
        sql_code = "INSERT INTO fav_artists (user_id, artist_id) VALUES (?,?)"
        values = (fav_artist.user_id, fav_artist.artist_id)
        self.cursor.execute(sql_code, values)
        self.conn.commit()

    def DeleteFromFavSongs(self, fav_song: m.Fav_Song):
        sql_code = "DELETE FROM fav_songs where user_id = ? and song_id = ?"
        values = (fav_song.user_id, fav_song.song_id)
        self.cursor.execute(sql_code, values)
        self.conn.commit()

    def DeleteFromFavArtists(self, fav_artist: m.Fav_Artist):
        sql_code = "DELETE FROM fav_artists where user_id = ? and artist_id = ?"
        values = (fav_artist.user_id, fav_artist.artist_id)
        self.cursor.execute(sql_code, values)
        self.conn.commit()

    def SelectArtistbyName(self, artist_name):
        sql_code = "SELECT artist_id FROM artists WHERE artist_name = ?"
        self.cursor.execute(sql_code, (artist_name,))
        id = self.cursor.fetchone()
        if id == None:
            return None
        else:
            return id[0]

    def SelectSongbyTitleAndArtist(self, song_name, artist_name):
        sql_code = ("SELECT id FROM songs "
                    "JOIN artists ON songs.artist_id = artists.artist_id "
                    "WHERE artists.artist_name = ? AND songs.title = ?")
        self.cursor.execute(sql_code, (artist_name, song_name))
        id = self.cursor.fetchone()
        if id is None:
            return id
        else:
            return id[0]

    def SelectGenre(self, song_id):
        sql_code = ("SELECT genre FROM songs where id = ?")
        self.cursor.execute(sql_code, (song_id,))
        genre = self.cursor.fetchone()
        if genre is None:
            return genre
        else:
            return genre[0]

    def CreateUser(self, user: m.User):
        sql_code = ("INSERT INTO users (username, email, password) VALUES (?,?,?) returning user_id")
        values = (user.username, user.email, user.password)
        self.cursor.execute(sql_code,values)
        id = self.cursor.fetchone()
        self.conn.commit()
        return id[0]

    def DeleteUser(self, user_id):
        sql_code = ("DELETE FROM users where user_id = ? returning username")
        self.cursor.execute(sql_code, (user_id,))
        username = self.cursor.fetchone()
        self.conn.commit()
        return username[0]

    def SelectUserForLogin(self, user: m.User):
        sql_code = ("SELECT * FROM users where password = ? and (username = ? or email = ?)")
        values = (user.password, user.username, user.email)
        self.cursor.execute(sql_code, values)
        info = self.cursor.fetchone()
        if info is None:
            return None
        user = m.User(id=info[0], username=info[1],email=info[2],password=info[3])
        return user

    def SelectUserByName(self, username):
        sql_code = ("SELECT user_id FROM users where username = ?")
        self.cursor.execute(sql_code,(username,))
        id = self.cursor.fetchone()
        if id is None:
            return None
        return id[0]