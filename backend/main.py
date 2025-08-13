from fastapi import FastAPI, Depends
from pymongo import MongoClient
from google.oauth2 import id_token
from google.auth.transport import requests
import yfinance as yf

app = FastAPI()

# MongoDB setup
client = MongoClient("mongodb://localhost:27017")
db = client["stock_explorer"]

# Google Auth setup
GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"

@app.post("/auth/google")
def google_auth(token: str):
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        user = {
            "email": idinfo["email"],
            "name": idinfo["name"]
        }
        db.users.update_one({"email": user["email"]}, {"$set": user}, upsert=True)
        return {"message": "User authenticated", "user": user}
    except ValueError:
        return {"error": "Invalid token"}

@app.get("/stocks/{symbol}")
def get_stock_data(symbol: str):
    stock = yf.Ticker(symbol)
    return stock.history(period="1mo").to_dict()
