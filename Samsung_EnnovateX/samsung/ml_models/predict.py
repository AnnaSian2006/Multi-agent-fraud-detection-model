import joblib
import pandas as pd

# Load trained models
agent1 = joblib.load("ml_models/agent1_model.pkl")
agent2 = joblib.load("ml_models/agent2_model.pkl")

# Example: make up a new transaction (replace with your real data)
sample_data = pd.DataFrame([{
    "amount": 200,
    "time": 12345,
    "user_id": 5,
    "device": 1,
    "location": 2
}])

# Predictions
pred1 = agent1.predict(sample_data)[0]
pred2 = agent2.predict(sample_data)[0]

print("Agent 1 Prediction (Transaction):", "Fraud" if pred1 == 1 else "Normal")
print("Agent 2 Prediction (Behavior):", "Fraud" if pred2 == 1 else "Normal")
