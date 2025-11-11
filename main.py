from server.database import database as db
from flask import Flask
from server.api import router as rt
from server.service import service as s
from server.data import spotify_data as s_data

if __name__ == '__main__':
    app = Flask(__name__)
    db1 = db.Database('music_library_db')
    service = s.Service()
    router = rt.Router(app,service)
    db1.DropAllTables()
    db1.CreateAllTables()
    s_data.populate_database(db1)
    router.run()
    router.define_routes()
    #db1.shutdown()