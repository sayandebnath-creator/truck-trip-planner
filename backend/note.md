# download the requirements
django djangorestframework pillow requests django-cors-headers

# create a project
django-admin startproject core .
python manage.py startapp trips

# added installed apps, middleware and cors allow in settings.py of django

# create services folder inside trips 
(inside it routing, hos.py)

# inside trips create serializers.py
(current loc,pickup loc etc)

# added basic hos logic in hos.py
(total driving hours etc)

# creting temporary test api in trips/views.py

# create urls.py in trips/ 
(CONNECT IT WITH CORE/ URLS.PY for plan trip)

# add new api in core for trips connection with trips

# Run server
python manage.py migrate
python manage.py runserver

# Right now you have:

Django configured
DRF working
Request validation
HOS calculation skeleton
API contract
App architecture

# Added openroute service dynamic and removed mock data as well as added .env
(HEIGIT Account)

# We now generate:

fuel stops
break stops
overnight resets

# Remaining Major Tasks
1. Generate ELD log sheets

MOST IMPORTANT

2. Export logs as PNG/PDF
3. Better UI polish
cards
spacing
loading states
responsive layout
4. Deployment
backend
frontend
5. Loom walkthrough