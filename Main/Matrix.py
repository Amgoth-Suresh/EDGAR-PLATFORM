import pandas as pd
import os
import io

# === Step 1: Set folder path ===
folder_path = r"C:\Users\amgot\OneDrive\Desktop\Edgar Internship\EDGAR_Test\Main\Thiomonas_binary"

# === Step 2: Automatically detect filenames ===
phylip_file = next((f for f in os.listdir(folder_path) if f.endswith(".phylip")), None)
ids_file = next((f for f in os.listdir(folder_path) if f.endswith(".ids")), None)
tsv_file = next((f for f in os.listdir(folder_path) if f.endswith(".tsv")), None)

if not all([phylip_file, ids_file, tsv_file]):
    raise FileNotFoundError("Missing one of: .phylip, .ids, or .tsv in the folder.")

# Full paths
phylip_file = os.path.join(folder_path, phylip_file)
ids_file = os.path.join(folder_path, ids_file)
tsv_file = os.path.join(folder_path, tsv_file)

# === Step 3: Load PHYLIP ===
with open(phylip_file, 'r') as f:
    phylip_lines = f.readlines()
binary_rows = [line.strip().split()[-1] for line in phylip_lines[1:]]
binary_matrix = pd.DataFrame([list(row) for row in binary_rows]).astype(int).T

# === Step 4: Load IDS ===
# === Step 4: Load IDS ===
with open(ids_file, 'r') as f:
    # Extract only the second part after tab
    strain_names = [line.strip().split('\t')[-1] for line in f.readlines()]
binary_matrix.columns = strain_names


# === Step 5: Load TSV gene names ===
tsv_df = pd.read_csv(tsv_file, sep='\t')
gene_id_columns = tsv_df.iloc[:, ::2]
gene_names = gene_id_columns.values.flatten().tolist()
gene_names = gene_names[:binary_matrix.shape[0]]
binary_matrix.index = gene_names

# === Step 7: Save to memory (string) ===
csv_buffer = io.StringIO()
binary_matrix.to_csv(csv_buffer)
csv_string = csv_buffer.getvalue()

# Optional: Preview first few lines
print("\n✅ CSV in memory (preview):")
print(csv_string[:1000])  # adjust length as needed
# === Step 6: Save to file ===
output_csv_path = os.path.join(folder_path, "presence_absence_matrix1.csv")
binary_matrix.to_csv(output_csv_path)
print(f"✅ CSV saved to file: {output_csv_path}")




