from flask import Flask , request, jsonify, Response 
from flask_restful import Resource , Api ,reqparse
from flask_cors import CORS
from bson import json_util
import pandas as pd
from flask_pymongo import PyMongo
import geopandas

app = Flask(__name__ ) #inizializza app

app.config["MONGO_URI"] = "mongodb://FranzettiGiulio:WWWWS7sN@cluster0-shard-00-00.njfds.mongodb.net:27017,cluster0-shard-00-01.njfds.mongodb.net:27017,cluster0-shard-00-02.njfds.mongodb.net:27017/film?ssl=true&replicaSet=atlas-zl2n0m-shard-0&authSource=admin&retryWrites=true&w=majority" #bisogna anche specificare il nome del database al interno del link 

mongo = PyMongo(app) #inizializza database

CORS(app) #serve ad angular per accedere ai dati
api = Api(app) 


class StatoCastApi(Resource):
    def get(self,titles): #quando angular invia una richiesta get
        NetFlix = mongo.db.netflix.find()
        dfNetFlix=pd.DataFrame(list(NetFlix)) #trasformo in un df
        world = geopandas.read_file(geopandas.datasets.get_path('naturalearth_lowres')) 
        dfGeoFlix= pd.merge(world,dfNetFlix,how="inner",left_on="name",right_on="country") 
        resp = dfGeoFlix[dfGeoFlix.title.str.contains(titles.capitalize())].drop("_id", axis = 1).iloc[:1].to_json() #trova titolo film, droppa colonna id, prende il primo record e lo trasforma in json
        #capitalize ti mette la prima lettera maiuscola
        return Response(resp, mimetype = 'application/json') #risposta angular 


api.add_resource(StatoCastApi, '/StatoCast/<string:titles>') #assegna la rotta StatoCast 

class InfoFilmApi(Resource):
    def get(self,titles):
        data = mongo.db.netflix.find()
        df=pd.DataFrame(list(data))
        resp = df[df.title.str.contains(titles.capitalize())].drop("_id", axis = 1).iloc[:1].to_dict('records') #array di dict
        resp2 = json_util.dumps(resp) 
        return Response(resp2 , mimetype = "application/json")

api.add_resource(InfoFilmApi, '/InfoFilmApi/<string:titles>') #assegna la rotta InfoFilmApi 

if __name__ == '__main__':
    app.run()