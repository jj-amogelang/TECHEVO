from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from datetime import datetime
from vercel_wsgi import handle_wsgi  # <-- ADD THIS

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Mock data for South African context
CITIES = [
    {"id": 1, "name": "Johannesburg"},
    {"id": 2, "name": "Pretoria"},
]

AREAS = {
    1: [
        {"id": 1, "name": "Sandton"},
        {"id": 2, "name": "Rosebank"},
        {"id": 3, "name": "Randburg"},
        {"id": 4, "name": "Fourways"},
        {"id": 5, "name": "Bryanston"},
    ],
    2: [
        {"id": 6, "name": "Menlyn"},
        {"id": 7, "name": "Centurion"},
        {"id": 8, "name": "Brooklyn"},
        {"id": 9, "name": "Hatfield"},
        {"id": 10, "name": "Waterkloof"},
    ],
}

# Sample property data (continue your PROPERTIES here...)
PROPERTIES = {
    (1, 1): [
        {"id": 1, "name": "The Leonardo", "type": "Mixed-use", "address": "75 Maude St, Sandton", "status": "Available", "price": "R25,000,000", "beds": 3, "baths": 3, "sqm": 240, "views": 2150, "image": "./public/images/sandton/images/leonardo.avif"},
        {"id": 2, "name": "Sandton Skye", "type": "Residential", "address": "3 Stan Rd, Morningside, Sandton", "status": "Available", "price": "R6,000,000", "beds": 2, "baths": 2, "sqm": 120, "views": 980, "image": "./public/images/sandton/skye.jpg"},
        {"id": 3, "name": "Atholl Towers", "type": "Commercial", "address": "129 Patricia Rd, Sandton", "status": "Available", "price": "R30,000,000", "beds": 0, "baths": 0, "sqm": 800, "views": 300, "image": "./public/images/sandton/atholl.jpg"},
    ],
}

# Add your routes
@app.route('/')
def home():
    return jsonify({"message": "Welcome to TechEvo API"})

@app.route('/cities')
def get_cities():
    return jsonify(CITIES)

@app.route('/areas/<int:city_id>')
def get_areas(city_id):
    return jsonify(AREAS.get(city_id, []))

@app.route('/properties/<int:city_id>/<int:area_id>')
def get_properties(city_id, area_id):
    return jsonify(PROPERTIES.get((city_id, area_id), []))

# 🔥 This is the magic line to export it for Vercel:
def handler(request, context):
    return handle_wsgi(app, request, context)
