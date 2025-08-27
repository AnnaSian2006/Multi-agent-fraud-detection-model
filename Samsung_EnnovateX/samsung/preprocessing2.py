#For Model 2, the is_fraud label was assigned as 1 when multiple behavioral metrics (e.g., abnormal swipe speed/pressure, unrealistic typing speed, unusual session time, or inconsistent device motion patterns) deviated significantly from normal human ranges, otherwise it was set to 0.

import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
import numpy as np

# ------------------ 1. Load dataset ------------------
df = pd.read_csv("C:\\Users\\Anna Sian\\OneDrive\\Desktop\\samsung\\model 2 - synthetic dataset.csv")  

# ------------------ 2. Parse date and time features ------------------
df['date'] = pd.to_datetime(df['date'], errors='coerce')
df['time'] = pd.to_datetime(df['time'], format='%H:%M:%S', errors='coerce')

# Extract date components
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day'] = df['date'].dt.day
df['day_of_week'] = df['date'].dt.dayofweek

# Extract time components
df['hour'] = df['time'].dt.hour
df['minute'] = df['time'].dt.minute
df['second'] = df['time'].dt.second

# ------------------ 3. Drop unneeded ID/date/time columns ------------------
drop_cols = ['session_id', 'user_id', 'date', 'time']
df.drop(columns=drop_cols, inplace=True, errors='ignore')

# ------------------ 4. Define target & features ------------------
y = df['is_fraud']
X = df.drop(columns=['is_fraud'])

# ------------------ 5. Identify categorical & numerical columns ------------------
categorical_cols = X.select_dtypes(include=['object']).columns.tolist()
numerical_cols = X.select_dtypes(include=['int64', 'float64']).columns.tolist()

# ------------------ 6. Create preprocessing transformers ------------------
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore', sparse_output=False))  # one-hot encode, dense output
])

# ------------------ 7. Combine into column transformer ------------------
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numerical_cols),
        ('cat', categorical_transformer, categorical_cols)
    ]
)

# ------------------ 8. Apply preprocessing ------------------
X_processed = preprocessor.fit_transform(X)

# ------------------ 9. Create DataFrame with proper column names ------------------
# Get numeric column names
num_cols = numerical_cols

# Get categorical column names after one-hot encoding
cat_cols = []
if categorical_cols:
    ohe = preprocessor.named_transformers_['cat'].named_steps['encoder']
    cat_cols = ohe.get_feature_names_out(categorical_cols).tolist()

# Combine all feature names
all_cols = num_cols + cat_cols

# Create DataFrame
df_processed = pd.DataFrame(X_processed, columns=all_cols)

# Add target column back
df_processed['is_fraud'] = y.values

# ------------------ 10. Save processed data to CSV ------------------
output_path = "C:\\Users\\Anna Sian\\OneDrive\\Desktop\\samsung\\model2_processed.csv"
df_processed.to_csv(output_path, index=False)

print(f"Processed feature matrix shape: {X_processed.shape}")
print(f"Original features: {X.shape[1]}, After encoding: {X_processed.shape[1]}")
print(f"Processed data saved to: {output_path}")
