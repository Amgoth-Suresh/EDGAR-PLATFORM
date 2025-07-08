import pandas as pd
import os
import io

# === Step 1: Set folder path ===
folder_path = r"C:\Users\amgot\OneDrive\Desktop\Edgar Internship\EDGAR_Test\Main\Acidovorax_binary"
parent_path = os.path.dirname(folder_path)
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

# === Step 5: Load gene names + descriptions from TSV ===
tsv_df = pd.read_csv(tsv_path, sep='\t')

gene_info = []
for _, row in tsv_df.iterrows():
    for i in range(0, len(row), 2):  # even = ID, odd = desc
        gene_id = str(row[i]).strip()
        gene_desc = str(row[i + 1]).strip() if i + 1 < len(row) else ''
        gene_info.append((gene_id, gene_desc))

# Trim to matrix size
gene_info = gene_info[:binary_matrix.shape[0]]

# Split to gene_ids and descriptions
gene_ids = [g[0] for g in gene_info]
gene_descs = [g[1] for g in gene_info]

# === Step 6: Add gene ID as index and description as a column ===
binary_matrix.index = gene_ids
binary_matrix.insert(0, "Description", gene_descs)

# === Step 7: Save CSV to disk and memory ===
csv_memory = io.StringIO()
binary_matrix.to_csv(csv_memory)
csv_string = csv_memory.getvalue()

csv_disk_path = os.path.join(folder_path, "presence_absence_matrix_with_descriptions.csv")
binary_matrix.to_csv(csv_disk_path)
print(f"✅ CSV saved to: {csv_disk_path}")

# === Step 8: Create JS geneCounts and geneDescriptions ===
# geneCounts = { strain: [genes where value == 1] }
gene_counts_dict = {
    strain: binary_matrix.index[binary_matrix[strain] == 1].tolist()
    for strain in binary_matrix.columns if strain != "Description"
}

# geneDescriptions = { gene_id: description }
gene_desc_dict = dict(zip(gene_ids, gene_descs))

# === Step 9: Write JS output (geneCounts + geneDescriptions) ===
js_disk_path = os.path.join(parent_path, "gene_counts8.js")
with open(js_disk_path, 'w', encoding='utf-8') as f:
    # Write geneCounts
    f.write("const geneCounts = {\n")
    for strain, genes in gene_counts_dict.items():
        gene_list = ', '.join(f'"{gene}"' for gene in genes)
        f.write(f'  "{strain}": [{gene_list}],\n')
    f.write("};\n\n")

    # Write geneDescriptions
    f.write("const geneDescriptions = {\n")
    for gene, desc in gene_desc_dict.items():
        safe_desc = desc.replace('"', "'")  # Escape any double quotes
        f.write(f'  "{gene}": "{safe_desc}",\n')
    f.write("};\n")

print(f"✅ JavaScript file created: {js_disk_path}")

# === Optional: Preview in terminal ===
print("\n✅ CSV (preview):")
print(csv_string[:500])

with open(js_disk_path, 'r', encoding='utf-8') as f:
    print("\n✅ gene_counts.js (preview):")
    print(f.read()[:500])
