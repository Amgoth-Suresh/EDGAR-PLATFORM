import ete3
import os

def newick_to_custom_format(newick_str):
    tree = ete3.Tree(newick_str, format=1)
    json_nodes = [{'id': 'root', 'name': 'Root', 'level': 0}]

    node_counter = [0]  # For naming internal nodes

    def create_node_id():
        node_id = f"Internal_node{node_counter[0]}"
        node_counter[0] += 1
        return node_id

    def traverse(node, parent_id, current_level):
        if node.is_leaf():
            json_nodes.append({
                'id': node.name,
                'parent': parent_id,
                'name': node.name,
                'customLabel': f"{node.dist:.9f}".rstrip('0').rstrip('.') if node.dist else '0',
                'level': current_level
            })
        else:
            current_id = create_node_id()
            name = node.name.strip() if node.name else '1'
            if '.' in name:
                name = name.rstrip('0').rstrip('.')
            name = name if name else '1'
            custom_label = f"{node.dist:.9f}".rstrip('0').rstrip('.') if node.dist else '0'

            json_nodes.append({
                'id': current_id,
                'parent': parent_id,
                'name': name,
                'customLabel': custom_label,
                'level': current_level
            })

            for child in node.get_children():
                traverse(child, current_id, current_level + 1)

    # Real root becomes Internal_node0 and its children are level 2
    root_id = create_node_id()
    json_nodes.append({
        'id': root_id,
        'parent': 'root',
        'name': tree.name if tree.name else '1',
        'customLabel': f"{tree.dist:.9f}".rstrip('0').rstrip('.') if tree.dist else '0',
        'level': 1
    })

    # Children of root are level 2
    for child in tree.get_children():
        traverse(child, root_id, 2)

    return json_nodes

def save_as_js_object(data, output_path):
    with open(output_path, 'w') as f:
        f.write("[\n")
        for i, node in enumerate(data):
            line = "  { " + ", ".join(
                [f"{key}: '{value}'" if not isinstance(value, int) else f"{key}: {value}" for key, value in node.items()]
            ) + " }"
            if i < len(data) - 1:
                line += ","
            f.write(line + "\n")
        f.write("]\n")

# === File Handling ===
input_path = r"C:\Users\amgot\OneDrive\Desktop\Edgar Internship\EDGAR_Test\Main\newicks'\EDGAR_Thiomonas.newick"
output_path = os.path.splitext(input_path)[0] + ".json"

# Read the Newick file
with open(input_path, 'r') as file:
    newick_data = file.read()

# Convert and save
custom_nodes = newick_to_custom_format(newick_data)
save_as_js_object(custom_nodes, output_path)

print(f"Custom-format tree saved to: {output_path}")
print("Conversion completed successfully.")