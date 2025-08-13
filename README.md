# Stock Explorer - Full-Stack Application

A modern full-stack application for exploring S&P 500 stock predictions using machine learning models.

## 🚀 Features

### Frontend (React + Tailwind CSS)
- **Home Page**: Landing page with authentication and feature showcase
- **Dashboard**: Interactive stock exploration with country/company selectors
- **Google Authentication**: Secure login using Google OAuth2
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Interactive Charts**: Real-time stock visualization using Chart.js
- **Prediction Cards**: Display ML model results (Linear Regression, KNN, RNN)

### Backend (FastAPI + MongoDB)
- **RESTful API**: Clean API endpoints for stock data and user management
- **Yahoo Finance Integration**: Real-time stock data fetching
- **Machine Learning Models**: Stock prediction using scikit-learn
- **MongoDB Integration**: User preferences and data caching
- **Google OAuth Verification**: Secure authentication
- **Graceful Fallbacks**: In-memory caching when MongoDB is unavailable

## 🏗️ Architecture

```
frontend/
├── public/
│   └── index.html          # Google OAuth script included
├── src/
│   ├── components/
│   │   ├── Header.jsx      # Navigation with auth status
│   │   ├── Footer.jsx      # Application footer
│   │   ├── Selector.jsx    # Country/Company dropdowns
│   │   ├── PredictionCard.jsx  # ML prediction display
│   │   ├── Chart.jsx       # Chart.js integration
│   │   └── GoogleAuthButton.jsx  # OAuth login
│   ├── pages/
│   │   ├── Home.jsx        # Landing page
│   │   └── Dashboard.jsx   # Main application
│   ├── App.jsx            # Routing and state management
│   └── index.js           # Application entry point
└── package.json

backend/
├── app/
│   ├── main.py            # FastAPI application
│   ├── routes/
│   │   ├── stocks.py      # Stock data endpoints
│   │   └── users.py       # Authentication endpoints
│   ├── services/
│   │   ├── yahoo_finance.py  # Data fetching & ML
│   │   └── database.py    # MongoDB operations
│   └── models.py          # Pydantic models
├── requirements.txt
└── Dockerfile
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 16+ and npm
- Python 3.11+
- MongoDB (Atlas free tier recommended)
- Google OAuth2 credentials

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your Google Client ID
npm start
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your MongoDB URL and Google Client ID
python -m app.main
```

## 🌐 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel using vercel.json configuration
```

### Backend (Railway/Render)
```bash
cd backend
# Use Dockerfile or railway.toml for deployment
# Set environment variables in your platform
```

## 📊 API Endpoints

### Stock Data
- `GET /stocks/{symbol}` - Get historical stock data
- `GET /stocks/{symbol}/predictions` - Get ML predictions
- `GET /stocks/{symbol}/info` - Get company information

### Authentication
- `POST /auth/google` - Verify Google ID token
- `GET /auth/users/{email}` - Get user information
- `POST /auth/users/{email}/preferences` - Update preferences
- `GET /auth/users/{email}/preferences` - Get preferences

## 🔧 Environment Variables

### Frontend (.env)
```
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_API_URL=http://localhost:8000
```

### Backend (.env)
```
GOOGLE_CLIENT_ID=your_google_client_id
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/stock_explorer
ALLOWED_ORIGINS=http://localhost:3000,https://your-domain.vercel.app
```

## 🤖 Machine Learning Models

The application uses three prediction models:

1. **Linear Regression**: Simple trend-based prediction
2. **K-Nearest Neighbors**: Pattern-based prediction using similar historical data
3. **Recurrent Neural Network**: Time-series prediction (simplified using moving averages)

## 🎯 Key Features Implemented

- ✅ React frontend with Tailwind CSS styling
- ✅ FastAPI backend with proper architecture
- ✅ MongoDB integration with graceful fallbacks
- ✅ Google OAuth2 authentication
- ✅ Yahoo Finance API integration
- ✅ Interactive charts using Chart.js
- ✅ Responsive design for mobile devices
- ✅ Error handling and loading states
- ✅ Deployment configuration for Vercel and Railway
- ✅ Environment-based configuration
- ✅ RESTful API design
- ✅ State management in React
- ✅ Country and company filtering
- ✅ Real-time stock predictions

## 🔍 Testing

The application has been tested with:
- ✅ Frontend UI rendering and responsiveness
- ✅ Backend API endpoints functionality
- ✅ Authentication flow simulation
- ✅ Country/company selector interactions
- ✅ Prediction display and updates
- ✅ Graceful error handling

## 📝 Notes

- The application gracefully handles network failures and provides mock data
- MongoDB is optional - the app uses in-memory caching as fallback
- Google authentication is configured but requires valid client credentials
- Stock data is cached for 1 hour to avoid excessive API calls
- The UI is fully responsive and mobile-friendly

## 🚀 Production Considerations

For production deployment:
1. Set up MongoDB Atlas cluster
2. Configure Google OAuth2 credentials
3. Set proper CORS origins
4. Enable HTTPS
5. Configure environment variables
6. Monitor API rate limits
7. Implement proper error logging