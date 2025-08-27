from flask import Flask, request, jsonify
import joblib
import json

# Load models
agent1 = joblib.load("ml_models/agent1_model.pkl")
agent2 = joblib.load("ml_models/agent2_model.pkl")

# Load feature lists (important for correct input order)
with open("C:\\Users\\Anna Sian\\OneDrive\\Desktop\\samsung\\ml_models\\ml_models\\agent1_features.json", "r") as f:
    agent1_features = json.load(f)

with open("C:\\Users\\Anna Sian\\OneDrive\\Desktop\\samsung\\ml_models\\ml_models\\agent2_features.json", "r") as f:
    agent2_features = json.load(f)

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    # Extract features for both agents
    agent1_input = [[data.get(f, 0) for f in agent1_features]]
    agent2_input = [[data.get(f, 0) for f in agent2_features]]

    # Predictions
    pred1 = agent1.predict_proba(agent1_input)[0][1]  # fraud probability
    pred2 = agent2.predict_proba(agent2_input)[0][1]

    # Combine results (simple average for now)
    final_score = (pred1 + pred2) / 2

    return jsonify({
    "agent1_score": float(pred1),
    "agent2_score": float(pred2),
    "final_fraud_score": float(final_score),
    "fraudulent": bool(final_score > 0.5)   # convert to native Python bool
})


if __name__ == "__main__":
    app.run(debug=True)
