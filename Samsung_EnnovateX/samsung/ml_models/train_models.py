# train_models.py  — run this from project root
import os, json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score
import joblib

HERE = os.path.dirname(os.path.abspath(__file__))

# ---- Load datasets (handles both root or data/processed placement) ----
def load_csv(name):
    p1 = os.path.join(HERE, name)
    p2 = os.path.join(HERE, "data", "processed", name)
    if os.path.exists(p1): return pd.read_csv(p1)
    if os.path.exists(p2): return pd.read_csv(p2)
    raise FileNotFoundError(f"Could not find {name} in project root or data/processed/")

df1 = load_csv("C:\\Users\\Anna Sian\\OneDrive\\Desktop\\samsung\\model1_processed.csv")   # target column = 'target'
df2 = load_csv("C:\\Users\\Anna Sian\\OneDrive\\Desktop\\samsung\\model2_processed.csv")   # target column = 'is_fraud'

# ---- Split X / y for each agent ----
X1, y1 = df1.drop(columns=["target"]), df1["target"]
X2, y2 = df2.drop(columns=["is_fraud"]), df2["is_fraud"]

# ---- Train/test split ----
X1_tr, X1_te, y1_tr, y1_te = train_test_split(X1, y1, test_size=0.2, random_state=42, stratify=y1)
X2_tr, X2_te, y2_tr, y2_te = train_test_split(X2, y2, test_size=0.2, random_state=42, stratify=y2)

# ---- Train models (robust baseline for tabular data) ----
clf1 = RandomForestClassifier(
    n_estimators=300, random_state=42, n_jobs=-1, class_weight="balanced"
)
clf1.fit(X1_tr, y1_tr)

clf2 = RandomForestClassifier(
    n_estimators=300, random_state=42, n_jobs=-1, class_weight="balanced"
)
clf2.fit(X2_tr, y2_tr)

# ---- Evaluate & print ----
def eval_and_print(name, model, X_te, y_te):
    y_pred = model.predict(X_te)
    try:
        y_proba = model.predict_proba(X_te)[:, 1]
        auc = roc_auc_score(y_te, y_proba)
    except Exception:
        auc = None
    print(f"\n=== {name} ===")
    print("Accuracy:", round(accuracy_score(y_te, y_pred), 4))
    if auc is not None:
        print("ROC AUC:", round(auc, 4))
    print(classification_report(y_te, y_pred, digits=4))

eval_and_print("Agent 1 (Transaction)", clf1, X1_te, y1_te)
eval_and_print("Agent 2 (Behavior)",    clf2, X2_te, y2_te)

# ---- Save models + feature names ----
MODEL_DIR = os.path.join(HERE, "ml_models")
os.makedirs(MODEL_DIR, exist_ok=True)

joblib.dump(clf1, os.path.join(MODEL_DIR, "agent1_model.pkl"))
joblib.dump(clf2, os.path.join(MODEL_DIR, "agent2_model.pkl"))

with open(os.path.join(MODEL_DIR, "agent1_features.json"), "w") as f:
    json.dump(list(X1.columns), f)
with open(os.path.join(MODEL_DIR, "agent2_features.json"), "w") as f:
    json.dump(list(X2.columns), f)

print(f"\n✅ Saved: ml_models/agent1_model.pkl, agent2_model.pkl and feature JSONs")
