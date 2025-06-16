from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="static")
CORS(app)

# -----------------------------------------
# Mock Data (Realistically structured)
# -----------------------------------------

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

# Utility to quickly add property
def create_property(id, name, type_, address, price, beds, baths, sqm, views, image, status="Available"):
    return {
        "id": id,
        "name": name,
        "type": type_,
        "address": address,
        "status": status,
        "price": price,
        "beds": beds,
        "baths": baths,
        "sqm": sqm,
        "views": views,
        "image": image,
    }

PROPERTIES = {
    (1, 1): [  # Sandton
        create_property(1, "The Leonardo", "Mixed-use", "75 Maude St", "R25,000,000", 3, 3, 240, 2150, "https://www.legacyhotels.co.za/sites/default/files/styles/slider_full/public/2020-11/Leonardo%20Exterior.jpg"),
        create_property(2, "Sandton Skye", "Residential", "3 Stan Rd", "R6,000,000", 2, 2, 120, 980, "https://cf.bstatic.com/xdata/images/hotel/max1024x768/123456789.jpg?k=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890&o=&hp=1"),
        create_property(3, "Atholl Towers", "Commercial", "129 Patricia Rd", "R30,000,000", 0, 0, 800, 300, "/static/images/sandton/atholl.jpg"),
        create_property(4, "Grayston Industrial Park", "Industrial", "Grayston Dr", "R12,000,000", 0, 0, 900, 220, "/static/images/sandton/industrial.jpg"),
        create_property(5, "Benmore Retail Centre", "Retail", "Benmore Rd", "R18,000,000", 0, 0, 600, 450, "/static/images/sandton/retail.jpg"),
    ],
    (1, 2): [  # Rosebank
        create_property(6, "The Bank", "Mixed-use", "26 Tyrwhitt Ave", "R20,000,000", 2, 2, 150, 1100, "/static/images/rosebank/bank.jpg"),
        create_property(7, "Keyes Art Mile", "Retail", "Keyes Ave", "R14,000,000", 0, 0, 700, 800, "/static/images/rosebank/keyes.jpg"),
        create_property(8, "Oxford Parks Offices", "Commercial", "Oxford Rd", "R22,000,000", 0, 0, 850, 400, "/static/images/rosebank/oxford.jpg"),
    ],
    (2, 6): [  # Menlyn
        create_property(9, "Menlyn Maine", "Mixed-use", "Central Square", "R35,000,000", 3, 2, 300, 950, "/static/images/menlyn/main.jpg"),
        create_property(10, "Menlyn Park Retail", "Retail", "Atterbury Rd", "R28,000,000", 0, 0, 1000, 1100, "/static/images/menlyn/park.jpg"),
    ],
    # Add more cities/areas and properties as needed...
}

# -----------------------------------------
# Routes
# -----------------------------------------

@app.route('/')
def home():
    return jsonify({"message": "Welcome to TechEvo API"})

@app.route('/api/cities', methods=['GET'])
def get_cities():
    return jsonify(CITIES)

@app.route('/api/areas/<int:city_id>', methods=['GET'])
def get_areas_by_city(city_id):
    areas = AREAS.get(city_id)
    if not areas:
        return jsonify({"error": "No areas found for this city"}), 404
    return jsonify(areas)

@app.route('/api/properties/<int:city_id>/<int:area_id>', methods=['GET'])
def get_properties(city_id, area_id):
    return jsonify(PROPERTIES.get((city_id, area_id), []))

@app.route('/api/dashboard', methods=['GET'])
def dashboard():
    city_id = request.args.get('city', type=int)
    area_id = request.args.get('area', type=int)

    if not city_id or not area_id:
        return jsonify({"error": "City and Area are required"}), 400

    area_data = AREAS.get(city_id, [])
    area_name = next((area["name"] for area in area_data if area["id"] == area_id), "Unknown Area")
    properties = PROPERTIES.get((city_id, area_id), [])

    return jsonify({
        "city_id": city_id,
        "area_id": area_id,
        "area_name": area_name,
        "area_description": f"Explore the properties in {area_name}, a prime location.",
        "area_image": f"/static/images/{area_name.lower().replace(' ', '')}/banner.jpg",
        "properties": properties,
    })

@app.route('/api/properties/<int:property_id>/report', methods=['GET'])
def property_report(property_id):
    property_obj = next(
        (prop for props in PROPERTIES.values() for prop in props if prop["id"] == property_id),
        None
    )

    if not property_obj:
        return jsonify({"error": "Property not found"}), 404

    report = {
        "property_id": property_id,
        "name": property_obj["name"],
        "revenue": 120000,
        "deals": 30,
        "leads": 120,
        "winRate": 45,
        "platforms": [
            {"name": "Airbnb", "value": 70000, "percent": 58},
            {"name": "Booking.com", "value": 30000, "percent": 25},
            {"name": "Direct", "value": 20000, "percent": 17},
        ]
    }
    return jsonify(report)

# -----------------------------------------
# Static File Serving
# -----------------------------------------

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory(os.path.join(app.root_path, 'static'), path)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if path.startswith('api') or path.startswith('static'):
        return jsonify({"error": "Not found"}), 404
    return send_from_directory(app.static_folder, 'index.html')

# -----------------------------------------
# Entry Point
# -----------------------------------------

if __name__ == "__main__":
    app.run(debug=True)
