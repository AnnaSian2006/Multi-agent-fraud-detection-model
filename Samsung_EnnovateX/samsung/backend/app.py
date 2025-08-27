from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # important to allow frontend calls

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    features = data.get("features", [])
    # run your fraud model here
    return jsonify({"prediction": "fraud" if sum(features) > 10 else "not fraud"})


if __name__ == "__main__":
    app.run(debug=True)
