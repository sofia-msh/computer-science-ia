from server.database.database import Database

class UserService():
    def __init__(self, db: Database):
        self.db = db

    def SelectUserForLogin(self, user):
        return self.db.SelectUserForLogin(user)

    def SelectUserByName(self, username):
        print(dir(self.db))
        return self.db.SelectUserByName(username)

    def InsertIntoUsers(self, user):
        id = self.db.CreateUser(user)
        return id

    def DeleteUser(self, id):
        return self.db.DeleteUser(id)