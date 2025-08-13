from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class User(BaseModel):
    email: EmailStr
    name: str
    picture: Optional[str] = None
    created_at: Optional[datetime] = None

class UserPreference(BaseModel):
    user_email: EmailStr
    preferred_country: Optional[str] = "USA"
    preferred_stocks: Optional[list] = []
    updated_at: Optional[datetime] = None

class StockData(BaseModel):
    symbol: str
    date: datetime
    open: float
    high: float
    low: float
    close: float
    volume: int

class PredictionRequest(BaseModel):
    symbol: str
    days: Optional[int] = 1

class PredictionResponse(BaseModel):
    symbol: str
    linear: dict
    knn: dict
    rnn: dict
    generated_at: datetime

class GoogleAuthRequest(BaseModel):
    token: str