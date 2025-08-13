from fastapi import APIRouter, HTTPException, Depends
from google.oauth2 import id_token
from google.auth.transport import requests
import os
from typing import Dict
from ..services.database import db
from ..models import GoogleAuthRequest, UserPreference

router = APIRouter(prefix="/auth", tags=["authentication"])

# Get Google Client ID from environment
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "YOUR_GOOGLE_CLIENT_ID")

@router.post("/google")
async def google_auth(auth_request: GoogleAuthRequest) -> Dict:
    """Authenticate user with Google ID token"""
    try:
        # Verify the token
        idinfo = id_token.verify_oauth2_token(
            auth_request.token, 
            requests.Request(), 
            GOOGLE_CLIENT_ID
        )
        
        # Extract user information
        user_data = {
            "email": idinfo["email"],
            "name": idinfo["name"],
            "picture": idinfo.get("picture", "")
        }
        
        # Create or update user in database
        user = db.create_user(user_data)
        
        return {
            "message": "User authenticated successfully",
            "user": {
                "email": user["email"],
                "name": user["name"],
                "picture": user.get("picture", "")
            }
        }
        
    except ValueError as e:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/users/{email}")
async def get_user(email: str) -> Dict:
    """Get user information"""
    try:
        user = db.get_user(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return {
            "email": user["email"],
            "name": user["name"],
            "picture": user.get("picture", ""),
            "created_at": user.get("created_at")
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/users/{email}/preferences")
async def update_preferences(email: str, preferences: UserPreference) -> Dict:
    """Update user preferences"""
    try:
        # Verify user exists
        user = db.get_user(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Update preferences
        prefs_data = preferences.dict(exclude={"user_email"})
        updated_prefs = db.update_user_preferences(email, prefs_data)
        
        return {
            "message": "Preferences updated successfully",
            "preferences": updated_prefs
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/users/{email}/preferences")
async def get_preferences(email: str) -> Dict:
    """Get user preferences"""
    try:
        preferences = db.get_user_preferences(email)
        
        if not preferences:
            # Return default preferences
            return {
                "user_email": email,
                "preferred_country": "USA",
                "preferred_stocks": [],
                "updated_at": None
            }
        
        return preferences
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))