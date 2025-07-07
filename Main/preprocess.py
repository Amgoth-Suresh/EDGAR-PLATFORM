# Load your CSV
import pandas as pd

df = pd.read_csv("Thiomonas_binary/presence_absence_matrix1.csv", index_col=0)

# Build dictionary: for each strain, list of genes where value == 1
gene_counts_dict = {
    strain: df.index[df[strain] == 1].tolist()
    for strain in df.columns
}

# Convert to JS format
js_map = "const geneCounts = {\n"
for strain, genes in gene_counts_dict.items():
    gene_list = ', '.join(f'"{gene}"' for gene in genes)
    js_map += f'  "{strain}": [{gene_list}],\n'
js_map += "};"

# Save to file
with open("gene_counts2.js", "w") as f:
    f.write(js_map)
