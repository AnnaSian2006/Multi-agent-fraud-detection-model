import pandas as pd

df1 = pd.read_csv("model1_processed.csv")
df2 = pd.read_csv("model2_processed.csv")

print("Model1 columns:", df1.columns)
print("Model2 columns:", df2.columns)

print("\nFirst 5 rows of model1:")
print(df1.head())

print("\nFirst 5 rows of model2:")
print(df2.head())
