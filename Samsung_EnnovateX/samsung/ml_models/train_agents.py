import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# --------------------------
# Load datasets
# --------------------------
model1_data = pd.read_csv("model1_processed.csv")
model2_data = pd.read_csv("model2_processed.csv")

# --------------------------
# Separate features & target
# (Assuming "label" is the target column, change if different)
# --------------------------
X1 = model1_data.drop("label", axis=1)
y1 = model1_data["label"]

X2 = model2_data.drop("label", axis=1)
y2 = model2_data["label"]

# --------------------------
# Train/test split
# --------------------------
X1_train, X1_test, y1_train, y1_test = train_test_split(X1, y1, test_size=0.2, random_state=42)
X2_train, X2_test, y2_train, y2_test = train_test_split(X2, y2, test_size=0.2, random_state=42)

# --------------------------
# Train models (you can replace with any ML model)
# --------------------------
model1 = RandomForestClassifier()
model1.fit(X1_train, y1_train)

model2 = RandomForestClassifier()
model2.fit(X2_train, y2_train)

# --------------------------
# Save models as .pkl
# --------------------------
joblib.dump(model1, "fraud_agent1.pkl")
joblib.dump(model2, "fraud_agent2.pkl")

print("✅ Both agents trained and saved successfully!")
