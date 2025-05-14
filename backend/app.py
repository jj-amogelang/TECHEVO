from flask import Flask, jsonify, request
from flask_cors import CORS

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

PROPERTIES = {
    (1, 1): [
        {"id": 1, "name": "The Leonardo", "type": "Mixed-use", "address": "75 Maude St, Sandton", "status": "Available", "price": "R25,000,000", "beds": 3, "baths": 3, "sqm": 240, "views": 2150, "image": "./public/images/sandton/images/leonardo.avif"},
        {"id": 2, "name": "Sandton Skye", "type": "Residential", "address": "3 Stan Rd, Morningside, Sandton", "status": "Available", "price": "R6,000,000", "beds": 2, "baths": 2, "sqm": 120, "views": 980, "image": "./public/images/sandton/skye.jpg"},
        {"id": 3, "name": "Atholl Towers", "type": "Commercial", "address": "129 Patricia Rd, Sandton", "status": "Available", "price": "R30,000,000", "beds": 0, "baths": 0, "sqm": 800, "views": 300, "image": "./public/images/sandton/atholl.jpg"},
    ],
}

@app.route('/')
def home():
    return jsonify({"message": "Welcome to TechEvo API"})

@app.route('/api/cities', methods=['GET'])
def get_cities():
    return jsonify(CITIES)

@app.route('/api/areas/<int:city_id>', methods=['GET'])
def get_areas_by_city(city_id):
    areas = AREAS.get(city_id, [])
    if not areas:
        return jsonify({"error": "No areas found for this city"}), 404
    return jsonify(areas)

@app.route('/properties/<int:city_id>/<int:area_id>', methods=['GET'])
def get_properties(city_id, area_id):
    return jsonify(PROPERTIES.get((city_id, area_id), []))

@app.route('/api/dashboard', methods=['GET'])
def dashboard():
    city_id = request.args.get('city', type=int)
    area_id = request.args.get('area', type=int)

    if not city_id or not area_id:
        return jsonify({"error": "City and Area are required"}), 400

    area_data = AREAS.get(city_id, [])
    properties = PROPERTIES.get((city_id, area_id), [])

    return jsonify({
        "city_id": city_id,
        "area_id": area_id,
        "area_name": next((area["name"] for area in area_data if area["id"] == area_id), "Unknown Area"),
        "area_description": "Explore the beauty of this area.",
        "area_image": "https://via.placeholder.com/1920x1080",
        "properties": properties
    })

if __name__ == "__main__":
    app.run(debug=True)
