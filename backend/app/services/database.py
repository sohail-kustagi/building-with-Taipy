import os
from pymongo import MongoClient
from datetime import datetime
from typing import Optional, List
import logging

logger = logging.getLogger(__name__)

class Database:
    def __init__(self):
        # Use environment variable or default to local MongoDB
        mongo_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
        self.connected = False
        self.cache = {}  # In-memory cache as fallback
        
        try:
            self.client = MongoClient(mongo_url, serverSelectionTimeoutMS=5000)
            # Test the connection
            self.client.admin.command('ismaster')
            self.db = self.client["stock_explorer"]
            self.users = self.db["users"]
            self.preferences = self.db["preferences"]
            self.stock_data = self.db["stock_data"]
            self.connected = True
            logger.info("Connected to MongoDB successfully")
        except Exception as e:
            logger.warning(f"MongoDB connection failed: {e}. Using in-memory cache.")
            self.connected = False

    def create_user(self, user_data: dict) -> dict:
        """Create or update a user"""
        user_data["created_at"] = datetime.utcnow()
        
        if self.connected:
            try:
                result = self.users.update_one(
                    {"email": user_data["email"]},
                    {"$set": user_data, "$setOnInsert": {"created_at": datetime.utcnow()}},
                    upsert=True
                )
                return self.users.find_one({"email": user_data["email"]})
            except Exception as e:
                logger.warning(f"MongoDB operation failed: {e}")
        
        # Fallback to cache
        self.cache[f"user_{user_data['email']}"] = user_data
        return user_data

    def get_user(self, email: str) -> Optional[dict]:
        """Get user by email"""
        if self.connected:
            try:
                return self.users.find_one({"email": email})
            except Exception as e:
                logger.warning(f"MongoDB operation failed: {e}")
        
        # Fallback to cache
        return self.cache.get(f"user_{email}")

    def update_user_preferences(self, email: str, preferences: dict) -> dict:
        """Update user preferences"""
        preferences["user_email"] = email
        preferences["updated_at"] = datetime.utcnow()
        
        if self.connected:
            try:
                result = self.preferences.update_one(
                    {"user_email": email},
                    {"$set": preferences},
                    upsert=True
                )
                return self.preferences.find_one({"user_email": email})
            except Exception as e:
                logger.warning(f"MongoDB operation failed: {e}")
        
        # Fallback to cache
        self.cache[f"prefs_{email}"] = preferences
        return preferences

    def get_user_preferences(self, email: str) -> Optional[dict]:
        """Get user preferences"""
        if self.connected:
            try:
                return self.preferences.find_one({"user_email": email})
            except Exception as e:
                logger.warning(f"MongoDB operation failed: {e}")
        
        # Fallback to cache
        return self.cache.get(f"prefs_{email}")

    def store_stock_data(self, symbol: str, data: dict):
        """Store stock data"""
        document = {
            "symbol": symbol,
            "data": data,
            "updated_at": datetime.utcnow()
        }
        
        if self.connected:
            try:
                self.stock_data.update_one(
                    {"symbol": symbol},
                    {"$set": document},
                    upsert=True
                )
                return
            except Exception as e:
                logger.warning(f"MongoDB operation failed: {e}")
        
        # Fallback to cache
        self.cache[f"stock_{symbol}"] = document

    def get_stock_data(self, symbol: str) -> Optional[dict]:
        """Get cached stock data"""
        if self.connected:
            try:
                result = self.stock_data.find_one({"symbol": symbol})
                
                # Check if data is recent (less than 1 hour old)
                if result and result.get("updated_at"):
                    time_diff = datetime.utcnow() - result["updated_at"]
                    if time_diff.total_seconds() < 3600:  # 1 hour
                        return result.get("data")
                
                return None
            except Exception as e:
                logger.warning(f"MongoDB operation failed: {e}")
        
        # Fallback to cache
        cached = self.cache.get(f"stock_{symbol}")
        if cached and cached.get("updated_at"):
            time_diff = datetime.utcnow() - cached["updated_at"]
            if time_diff.total_seconds() < 3600:  # 1 hour
                return cached.get("data")
        
        return None

# Global database instance
db = Database()