from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from datetime import datetime

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
    1: [  # Johannesburg
        {"id": 1, "name": "Sandton"},
        {"id": 2, "name": "Rosebank"},
        {"id": 3, "name": "Randburg"},
        {"id": 4, "name": "Fourways"},
        {"id": 5, "name": "Bryanston"},
    ],
    2: [  # Pretoria
        {"id": 6, "name": "Menlyn"},
        {"id": 7, "name": "Centurion"},
        {"id": 8, "name": "Brooklyn"},
        {"id": 9, "name": "Hatfield"},
        {"id": 10, "name": "Waterkloof"},
    ],
}

# Updated real property data per area
PROPERTIES = {
    (1, 1): [  # Sandton
        {"id": 1, "name": "The Leonardo", "type": "Mixed-use", "address": "75 Maude St, Sandton", "status": "Available", "price": "R25,000,000", "beds": 3, "baths": 3, "sqm": 240, "views": 2150, "image": "./public/images/sandton/images/leonardo.avif"},
        {"id": 2, "name": "Sandton Skye", "type": "Residential", "address": "3 Stan Rd, Morningside, Sandton", "status": "Available", "price": "R6,000,000", "beds": 2, "baths": 2, "sqm": 120, "views": 980, "image": "./public/images/sandton/skye.jpg"},
        {"id": 3, "name": "Atholl Towers", "type": "Commercial", "address": "129 Patricia Rd, Sandton", "status": "Available", "price": "R40,000,000", "beds": None, "baths": None, "sqm": 1000, "views": 600, "image": "https://i.pinimg.com/originals/98/12/e7/9812e7ac53b2a6db6adfd1b6bfb2edcf.jpg"},
        {"id": 4, "name": "The Capital on the Park", "type": "Residential", "address": "101 Katherine St, Sandown, Sandton", "status": "Available", "price": "R8,000,000", "beds": 2, "baths": 2, "sqm": 150, "views": 1045, "image": "https://media-cdn.tripadvisor.com/media/photo-s/19/e1/d0/9d/the-capital-on-the-park.jpg"},
        {"id": 5, "name": "Michelangelo Towers", "type": "Residential", "address": "8 Maude St, Sandown, Sandton", "status": "Available", "price": "R22,000,000", "beds": 3, "baths": 2, "sqm": 200, "views": 1875, "image": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/223135471.jpg"},
        {"id": 6, "name": "Grayston Office Park", "type": "Commercial", "address": "128 Grayston Dr, Sandton", "status": "Under Offer", "price": "R35,000,000", "beds": None, "baths": None, "sqm": 850, "views": 775, "image": "https://officespace.centre/images/listings/grayston-office-park/office-building.jpeg"},
        {"id": 7, "name": "BlackBrick Sandton", "type": "Mixed-use", "address": "25 Fredman Dr, Sandton", "status": "Available", "price": "R4,500,000", "beds": 1, "baths": 1, "sqm": 70, "views": 920, "image": "https://www.blackbrickclub.com/wp-content/uploads/2021/05/BlackBrick-Sandton-Exterior.jpg"},
    ],
    (1, 2): [  # Rosebank
        {"id": 8, "name": "The Tyrwhitt", "type": "Residential", "address": "39 Bath Ave, Rosebank", "status": "Available", "price": "R3,500,000", "beds": 2, "baths": 2, "sqm": 110, "views": 870, "image": "https://images.adsttc.com/media/images/60f0/46ba/74f0/2500/3c00/001f/newsletter/PH_004.jpg"},
        {"id": 9, "name": "The Median", "type": "Residential", "address": "23 Cradock Ave, Rosebank", "status": "Available", "price": "R2,700,000", "beds": 2, "baths": 1, "sqm": 95, "views": 540, "image": "https://assets-global.website-files.com/5d12df92182b307bc5806b4b/63777c260dc526b1b927726e_property-the-median_0-p-1080.jpeg"},
        {"id": 10, "name": "The Zone@Rosebank", "type": "Retail", "address": "177 Oxford Rd, Rosebank", "status": "Available", "price": "R85,000,000", "beds": None, "baths": None, "sqm": 2000, "views": 1900, "image": "https://i.ytimg.com/vi/IFsTkXHeBdw/maxresdefault.jpg"},
        {"id": 11, "name": "Rosebank Towers", "type": "Commercial", "address": "15 Biermann Ave, Rosebank", "status": "Available", "price": "R55,000,000", "beds": None, "baths": None, "sqm": 1200, "views": 820, "image": "https://www.property24.com/images/lp/rosebank_towers_offices.jpg"},
        {"id": 12, "name": "Park Central", "type": "Residential", "address": "6 Keyes Ave, Rosebank", "status": "Available", "price": "R3,800,000", "beds": 2, "baths": 2, "sqm": 105, "views": 630, "image": "https://i0.wp.com/www.propertywheel.co.za/wp-content/uploads/2016/06/Park-Central-Rosebank.jpg"},
        {"id": 13, "name": "Oxford Parks", "type": "Mixed-use", "address": "199 Oxford Rd, Dunkeld", "status": "Available", "price": "R95,000,000", "beds": None, "baths": None, "sqm": 3500, "views": 1120, "image": "https://i.ytimg.com/vi/7GZwHFuMBgA/maxresdefault.jpg"},
        {"id": 14, "name": "The Bolton", "type": "Residential", "address": "2 Sturdee Ave, Rosebank", "status": "Available", "price": "R1,900,000", "beds": 1, "baths": 1, "sqm": 70, "views": 460, "image": "https://images.prop24.com/270396230/Crop512x342"},
    ],
    # Similarly, define 7 properties for Randburg, Fourways, Bryanston, Menlyn, and Centurion...
}

@app.route('/api/cities', methods=['GET'])
def get_cities():
    return jsonify(CITIES)

@app.route('/api/areas/<int:city_id>', methods=['GET'])
def get_areas(city_id):
    if city_id in AREAS:
        return jsonify(AREAS[city_id])
    return jsonify([])

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard():
    city_id = int(request.args.get('city', 0))
    area_id = int(request.args.get('area', 0))

    activity_metrics = {
        "new_deals": {"value": 14, "change": -10.6},
        "new_offers": {"value": 22, "change": 27.5},
        "accepted_offers": {"value": 16, "change": -1.6},
        "new_leads": {"value": 20, "change": 12.3}
    }

    properties = PROPERTIES.get((city_id, area_id), [])

    area_name = None
    if city_id in AREAS:
        for area in AREAS[city_id]:
            if area["id"] == area_id:
                area_name = area["name"]
                break

    return jsonify({
        "activity_metrics": activity_metrics,
        "properties": properties,
        "area_name": area_name
    })

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
