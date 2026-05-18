# Spotter HOS Trip Planner

A full-stack logistics planning application built with Django and React that generates Hours of Service (HOS) compliant trip plans and Electronic Logging Device (ELD) daily logs for truck drivers.

## Overview

<!-- This project was built as part of a Full Stack Developer assessment. -->

The application accepts trip details such as:
- Current location
- Pickup location
- Dropoff location
- Current cycle hours used

It then:
- Calculates trip distance and routing
- Plans HOS-compliant driving schedules
- Generates rest and fuel stops
- Produces driver daily log sheets (ELD logs)
- Visualizes trip routes on a map

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
- TailwindCSS
- React Leaflet

## APIs
- OpenRouteService
- OpenStreetMap

---

# Features

- Trip route planning
- HOS driving calculations
- 70-hour / 8-day cycle support
- 11-hour driving limit enforcement
- 14-hour duty window handling
- 30-minute mandatory break calculations
- Fuel stop planning
- Multi-day trip handling
- ELD log generation
- Interactive route visualization

---

# Hours of Service Assumptions

This MVP currently supports:
- Property-carrying drivers
- 70 hours / 8 days cycle
- Standard driving conditions
- Fueling every 1000 miles
- 1 hour pickup and dropoff time

The application does not currently implement:
- Split sleeper berth logic
- Adverse driving condition exceptions
- Intrastate-specific exemptions
- Advanced fleet management features

---

# Project Structure

```bash
spotter-hos-trip-planner/
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

### Response

```json
{
  "distance_miles": 1400,
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

# Future Improvements

- Advanced HOS compliance engine
- Split sleeper berth support
- Real-time traffic integration
- Drag-and-drop trip planning
- PDF export for log sheets
- Driver dashboard analytics
- Authentication and fleet management

---

# Deployment

## Frontend
- Vercel

## Backend
- Render / Railway

<!-- --- -->

<!-- # Assessment Notes

This project was developed as part of a Full Stack Developer technical assessment focused on:
- Route planning
- HOS compliance
- ELD log generation
- Full-stack system design
- UI/UX quality -->

---

# License

<!-- This project is intended for assessment and demonstration purposes. -->
This project is intended for educational and demonstration purposes.