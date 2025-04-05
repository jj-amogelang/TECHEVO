# EVO Property Management Dashboard

A modern web application for property management with a React frontend and Python Flask backend.

## Features

- Modern, responsive UI with smooth animations
- Property dashboard with real-time statistics
- City and area-based property filtering
- Interactive property listings
- Beautiful landing page with feature highlights

## Tech Stack

### Frontend
- React 18
- React Router v6
- Framer Motion for animations
- Tailwind CSS for styling
- Axios for API calls

### Backend
- Python 3.8+
- Flask
- Flask-CORS
- SQLAlchemy (for future database integration)

## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd evo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd evo-backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```bash
   python app.py
   ```

The backend API will be available at `http://localhost:5000`

## API Endpoints

- `GET /api/cities` - Get list of available cities
- `GET /api/areas/<city_id>` - Get areas for a specific city
- `GET /api/dashboard?city=<city_id>&area=<area_id>` - Get dashboard data for a specific city and area

## Development

The application is structured as follows:

```
evo-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Home.jsx
│   │   ├── PropertyLanding.jsx
│   │   └── PropertyDashboard.jsx
│   ├── App.js
│   └── index.js
└── package.json

evo-backend/
├── app.py
└── requirements.txt
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 