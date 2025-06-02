import pandas as pd


df = pd.read_csv("EDGAR 3.5 JLU Giessen (1).csv", encoding='utf-8')
print(df.columns)
df.describe()