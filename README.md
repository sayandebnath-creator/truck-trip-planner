# Spotter HOS Trip Planner

A full-stack logistics planning application built with Django and React that generates Hours of Service (HOS) compliant trip plans and Electronic Logging Device (ELD) daily logs for truck drivers.

---

# Live Demo

## Frontend
https://truck-trip-planner-fawn.vercel.app/

## Backend API
https://truck-trip-planner-djnv.onrender.com/api/plan-trip/

---

# Features

- Route planning and distance calculation
- HOS-compliant driving schedule generation
- Multi-day trip planning
- 70-hour / 8-day cycle support
- 11-hour driving limit handling
- 14-hour duty window calculations
- 30-minute mandatory break support
- Fuel stop planning
- ELD log sheet generation
- Interactive route visualization using maps
- REST API architecture
- Responsive frontend UI

---

# Tech Stack

## Backend
- Django
- Django REST Framework
- Pillow
- Requests

## Frontend
- React
- Vite
- TypeScript
- TailwindCSS
- React Leaflet

## APIs & Services
- OpenRouteService API
- OpenStreetMap
- Render
- Vercel

---

# System Architecture

```text
Frontend (React)
        ↓
Django REST API
        ↓
Routing + HOS Planning Services
        ↓
ELD Log Renderer
        ↓
Generated Driver Logs + Route Data
```

---

# Hours of Service Assumptions

This MVP currently supports:

- Property-carrying drivers
- 70 hours / 8 days cycle
- Standard driving conditions
- Fueling every 1000 miles
- 1 hour pickup and dropoff time
- Simplified HOS scheduling logic

Not currently implemented:

- Split sleeper berth logic
- Adverse driving condition exceptions
- Intrastate-specific exemptions
- Real-time traffic handling
- Advanced fleet management

---

# Project Structure

```bash
truck-trip-planner/
├── backend/
│   ├── core/
│   ├── trips/
│   │   ├── services/
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   └── manage.py
│
├── frontend/
│   ├── src/
│   └── public/
│
└── README.md
```

---

# Environment Variables

## Backend `.env`

```env
OPENROUTE_API_KEY=your_api_key
```

---

# Backend Setup

## Create virtual environment

```bash
python -m venv venv
```

## Activate virtual environment

### macOS/Linux

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

## Install dependencies

```bash
pip install -r requirements.txt
```

## Run migrations

```bash
python manage.py migrate
```

## Start backend server

```bash
python manage.py runserver
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

# Frontend Setup

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# API Endpoint

## Plan Trip

```http
POST /api/plan-trip/
```

### Request Body

```json
{
  "current_location": "New York",
  "pickup_location": "Chicago",
  "dropoff_location": "Dallas",
  "current_cycle_used": 20
}
```

### Sample Response

```json
{
  "distance_miles": 1400,
  "days_required": 2,
  "logs": [
    {
      "day": 1,
      "driving_hours": 11,
      "break_required": true,
      "off_duty_hours": 10
    }
  ]
}
```

---

# Deployment

## Frontend
- Vercel

## Backend
- Render

---

# Future Improvements

- Advanced HOS compliance engine
- Split sleeper berth support
- PDF export for ELD logs
- Authentication and fleet management
- Driver dashboard analytics
- Real-time traffic integration
- Route optimization

---

# License

This project is intended for educational and demonstration purposes.