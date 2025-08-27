import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os

# Load dataset
df = pd.read_csv("model2_processed.csv")

# Assume last column is target (fraud/not fraud)
X = df.iloc[:, :-1]
y = df.iloc[:, -1]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Train model (Gradient Boosting – works well for noisy behavioral data)
model = GradientBoostingClassifier(n_estimators=150, learning_rate=0.1, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print("Agent 2 (Behavior Pattern) Results:")
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# Save model
os.makedirs("ml_models", exist_ok=True)
joblib.dump(model, "ml_models/agent2_model.pkl")
print("✅ Agent 2 model saved at ml_models/agent2_model.pkl")
