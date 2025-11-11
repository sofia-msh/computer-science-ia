import datetime
from flask import Flask, request, jsonify, make_response, g
import server.service.service
from model import models as m
import jwt
import server.service as service

class Router():

    def __init__(self, app: Flask, service: service):
        self.app = app
        self.app.config['SECRET_KEY'] = 'world'
        self.ip_dict = {}
        self.urls = []
        self.service = service
        self.non_token_urls = ["/user/reg", "/user/auth"]

    def run(self):
        self.define_routes()
        for i in self.app.url_map.iter_rules():
            self.urls.append(i.rule)
        self.define_middleware()
        self.app.run()


    def define_middleware(self):
        @self.app.before_request
        def middleware_token():
            if request.path in self.urls and request.path not in self.non_token_urls:
                header = request.headers.get("Authorization")
                if header is None:
                    return make_response(jsonify({"message":"Token required"}), 403)
                split_token = header.split(" ")
                if len(split_token) == 2:
                    token = split_token[1]
                    try:
                        decode_token = jwt.decode(token,key=self.app.config['SECRET_KEY'],algorithms='HS256')
                    except jwt.exceptions.DecodeError:
                        return make_response(jsonify({"message":"Token Invalid"}), 400)
                    g.id = decode_token["id"]

    def define_routes(self):

        @self.app.route("/user/reg", methods=["POST"])
        def registration():
            req_data = request.json
            username = req_data["username"]
            id = self.service.user_service.SelectUserByName(username)
            if id is None:
                email = req_data.get("email")
                username = req_data.get("username")
                password = req_data.get("password")
                user = m.User(username=username,email=email,password=password)
                id = self.service.user_service.InsertIntoUsers(user)
                return make_response(jsonify({"id": id}), 200)
            else:
                return make_response(jsonify(f"User ID {id} exists"), 400)

        @self.app.route("/user/auth", methods=["POST"])
        def authorization():
            req_data = request.json
            username = req_data.get("username")
            email = req_data.get("email")
            password = req_data.get("password")
            user = m.User(username=username, email=email, password=password,
                          id=self.service.user_service.SelectUserByName(username))
            user = self.service.user_service.SelectUserForLogin(user)
            if user is not None:
                token = jwt.encode(payload={'username': user.username,
                                            'id': user.id,
                                            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},
                                   key=self.app.config['SECRET_KEY'],
                                   algorithm='HS256'
                                   )
                r = make_response(jsonify({"status": "Authorized", "token": f"{token}"}), 200)
                return r
            return make_response(jsonify("Incorrect Credentials."), 401)

        @self.app.route("/user/delete", methods=["POST"])
        def deletion():
            id = g.id
            username = self.service.user_service.DeleteUser(id)
            return make_response(jsonify(f"User - {username}, has been successfully deleted."), 200)

        @self.app.route("/fav_songs/add", methods=["GET"])
        def add_product_into_cart():
            song_id = request.args.get("song_id")
            id = g.id
            if self.service.ProductService.CartService.InsertIntoCart(id, song_id) is None:
                return make_response(jsonify("No such product"), 400)
            return make_response(jsonify("Product added"), 200)