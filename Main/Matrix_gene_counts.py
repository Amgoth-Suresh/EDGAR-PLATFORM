import pandas as pd
import os
import io

# === Step 1: Set folder path ===
folder_path = r"C:\Users\amgot\OneDrive\Desktop\Edgar Internship\EDGAR_Test\Main\Thiomonas_binary"

# === Step 2: Detect necessary files ===
phylip_file = next((f for f in os.listdir(folder_path) if f.endswith(".phylip")), None)
ids_file = next((f for f in os.listdir(folder_path) if f.endswith(".ids")), None)
tsv_file = next((f for f in os.listdir(folder_path) if f.endswith(".tsv")), None)

if not all([phylip_file, ids_file, tsv_file]):
    raise FileNotFoundError("Missing one of: .phylip, .ids, or .tsv in the folder.")

# Full paths
phylip_path = os.path.join(folder_path, phylip_file)
ids_path = os.path.join(folder_path, ids_file)
tsv_path = os.path.join(folder_path, tsv_file)

# === Step 3: Load PHYLIP ===
with open(phylip_path, 'r') as f:
    phylip_lines = f.readlines()
binary_rows = [line.strip().split()[-1] for line in phylip_lines[1:]]
binary_matrix = pd.DataFrame([list(row) for row in binary_rows]).astype(int).T

# === Step 4: Load IDS ===
with open(ids_path, 'r') as f:
    strain_names = [line.strip().split('\t')[-1] for line in f.readlines()]
binary_matrix.columns = strain_names

# === Step 5: Load gene names from TSV ===
tsv_df = pd.read_csv(tsv_path, sep='\t')
gene_id_columns = tsv_df.iloc[:, ::2]
gene_names = gene_id_columns.values.flatten().tolist()
gene_names = gene_names[:binary_matrix.shape[0]]
binary_matrix.index = gene_names

# === Step 6: Save CSV to disk + memory ===
csv_memory = io.StringIO()
binary_matrix.to_csv(csv_memory)
csv_string = csv_memory.getvalue()

csv_disk_path = os.path.join(folder_path, "presence_absence_matrix1.csv")
binary_matrix.to_csv(csv_disk_path)
print(f"✅ CSV saved to: {csv_disk_path}")

# === Step 7: Create JS geneCounts string ===
gene_counts_dict = {
    strain: binary_matrix.index[binary_matrix[strain] == 1].tolist()
    for strain in binary_matrix.columns
}

js_memory = io.StringIO()
js_memory.write("const geneCounts = {\n")
for strain, genes in gene_counts_dict.items():
    gene_list = ', '.join(f'"{gene}"' for gene in genes)
    js_memory.write(f'  "{strain}": [{gene_list}],\n')
js_memory.write("};\n")
js_string = js_memory.getvalue()

js_disk_path = os.path.join(folder_path, "gene_counts.js")
with open(js_disk_path, 'w') as f:
    f.write(js_string)

print(f"✅ geneCounts JS saved to: {js_disk_path}")

# === Optional: Preview ===
print("\n✅ CSV (in memory preview):")
print(csv_string[:500])
print("\n✅ JS (in memory preview):")
print(js_string[:500])

# Now both `csv_string` and `js_string` are ready for in-memory use
