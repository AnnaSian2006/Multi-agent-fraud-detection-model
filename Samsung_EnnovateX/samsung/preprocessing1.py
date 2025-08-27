import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
import os

# 1. Load dataset
df = pd.read_csv("C:\\Users\\Anna Sian\\OneDrive\\Desktop\\samsung\\model 1 - synthetic dataset.csv")  # Adjust path to your raw data location

# 2. Clean currency columns
currency_symbols = {
    '$': 1.0,     # USD base
    '€': 1.1,     # EUR to USD
    '₹': 0.012    # INR to USD
}

def clean_currency(val):
    if pd.isnull(val):
        return np.nan
    val_str = str(val).replace(",", "")
    symbol = val_str[0]
    try:
        num = float(val_str.replace(symbol, ""))
    except:
        return np.nan
    return num * currency_symbols.get(symbol, 1)

for col in ["TransactionAmount", "AmountBefore", "AmountAfter"]:
    if col in df.columns:
        df[col] = df[col].apply(clean_currency)

# 3. Parse date and time features
df["TransactionDate"] = pd.to_datetime(df["TransactionDate"], errors='coerce')
df["TransactionTime"] = pd.to_datetime(df["TransactionTime"], format='%H:%M:%S', errors='coerce')

# Extract new features
df["Year"] = df["TransactionDate"].dt.year
df["Month"] = df["TransactionDate"].dt.month
df["Day"] = df["TransactionDate"].dt.day
df["DayOfWeek"] = df["TransactionDate"].dt.dayofweek
df["Hour"] = df["TransactionTime"].dt.hour
df["Minute"] = df["TransactionTime"].dt.minute
df["Second"] = df["TransactionTime"].dt.second

# 4. Drop unneeded identifier columns
drop_cols = ["SerialNumber", "TransactionID", "UserID", "TransactionDate", "TransactionTime"]
df = df.drop(columns=[col for col in drop_cols if col in df.columns])

# 5. Separate target from features
y = df["IsFraud"]
X = df.drop(columns=["IsFraud"])

# 6. Identify categorical & numerical columns
categorical_cols = X.select_dtypes(include=["object"]).columns.tolist()
numerical_cols = X.select_dtypes(include=["int64", "float64"]).columns.tolist()

# 7. Preprocessing pipelines
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore'))
])

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numerical_cols),
        ('cat', categorical_transformer, categorical_cols)
    ]
)

# 8. Apply preprocessing
X_processed = preprocessor.fit_transform(X)

# 9. Get final feature names from the ColumnTransformer
feature_names = preprocessor.get_feature_names_out()

# 10. Convert processed NumPy array back to DataFrame
X_df = pd.DataFrame(
    X_processed.toarray() if hasattr(X_processed, "toarray") else X_processed,
    columns=feature_names
)

# Add target column back
X_df["target"] = y.values

# 11. Save processed dataset
output_dir = "../data/processed"
os.makedirs(output_dir, exist_ok=True)
output_path = os.path.join(os.path.dirname(__file__), "model1_processed.csv")
X_df.to_csv(output_path, index=False)

print(f"Processed dataset saved at: {output_path}")
print(f"Shape: {X_df.shape}")

# --- Integrated block for transactions.csv ---
try:
    df2 = pd.read_csv("transactions.csv")  # change to your actual file name

    # Example preprocessing steps
    if 'amount' in df2.columns:
        df2['amount'] = pd.to_numeric(df2['amount'], errors='coerce')
    if 'timestamp' in df2.columns:
        df2['timestamp'] = pd.to_datetime(df2['timestamp'], errors='coerce')
    df2.dropna(inplace=True)  # Remove rows with missing values

    # Path for processed file in the same directory
    output_file2 = os.path.join(os.path.dirname(__file__), "transactions_processed.csv")

    # Save the processed file
    df2.to_csv(output_file2, index=False)

    print(f"Processed file saved as {output_file2}")
except Exception as e:
    print(f"transactions.csv block error: {e}")
