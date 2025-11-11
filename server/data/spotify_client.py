import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

CLIENT_ID = '3524c8d7277742fdba867ed2032830bf'
CLIENT_SECRET = '1a39facb7268492bb81cd7f6b42f9c40'

def get_spotify_client():
    auth_manager = SpotifyClientCredentials(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET
    )
    return spotipy.Spotify(auth_manager=auth_manager)
