from fastapi import APIRouter, HTTPException, Depends
from typing import Dict
from ..services.yahoo_finance import yahoo_service
from ..services.database import db
from ..models import PredictionRequest

router = APIRouter(prefix="/stocks", tags=["stocks"])

@router.get("/{symbol}")
async def get_stock_data(symbol: str) -> Dict:
    """Get stock data for a symbol"""
    try:
        # Check cache first
        cached_data = db.get_stock_data(symbol)
        if cached_data:
            return cached_data
        
        # Fetch fresh data
        data = yahoo_service.get_stock_data(symbol.upper())
        
        # Cache the data
        db.store_stock_data(symbol.upper(), data)
        
        return data
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{symbol}/predictions")
async def get_predictions(symbol: str) -> Dict:
    """Get stock price predictions"""
    try:
        predictions = yahoo_service.generate_predictions(symbol.upper())
        return predictions
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{symbol}/info")
async def get_company_info(symbol: str) -> Dict:
    """Get company information"""
    try:
        info = yahoo_service.get_company_info(symbol.upper())
        return info
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/{symbol}/predictions")
async def generate_custom_predictions(
    symbol: str, 
    request: PredictionRequest
) -> Dict:
    """Generate custom predictions with specified parameters"""
    try:
        predictions = yahoo_service.generate_predictions(symbol.upper())
        
        # Add metadata
        result = {
            "symbol": symbol.upper(),
            "predictions": predictions,
            "days_ahead": request.days,
            "generated_at": "2024-01-01T00:00:00Z"  # Placeholder
        }
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))