from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import stocks, users

# Create FastAPI app
app = FastAPI(
    title="Stock Explorer API",
    description="A FastAPI backend for stock data and predictions",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(stocks.router)
app.include_router(users.router)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Stock Explorer API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)