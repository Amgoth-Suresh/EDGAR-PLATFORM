import ete3
import os

def newick_to_custom_format(newick_str):
    tree = ete3.Tree(newick_str, format=1)
    json_nodes = [{'id': 'root', 'name': 'Root', 'level': 0}]
    node_counter = [0]

    def create_node_id():
        node_id = f"Internal_node{node_counter[0]}"
        node_counter[0] += 1
        return node_id

    def process_node(node, parent_id, current_level):
        if node.is_leaf():
            value = f"{node.dist:.9f}".rstrip('0').rstrip('.') if node.dist else '0'
            json_nodes.append({
                'id': node.name,
                'parent': parent_id,
                'name': node.name,
                'customLabel': value,
                'level': current_level,
                'link': {
                    'color': f"getLinkColor('{value}')"
                }
            })
        else:
            current_id = create_node_id()
            name = node.name.strip() if node.name else '1'
            if '.' in name:
                name = name.rstrip('0').rstrip('.')
            name = name if name else '1'
            value = f"{node.dist:.9f}".rstrip('0').rstrip('.') if node.dist else '0'
            json_nodes.append({
                'id': current_id,
                'parent': parent_id,
                'name': name,
                'customLabel': value,
                'level': current_level,
                'link': {
                    'color': f"getLinkColor('{value}')"
                }
            })

            for child in node.get_children():
                process_node(child, current_id, current_level + 1)

    root_id = create_node_id()
    root_value = f"{tree.dist:.9f}".rstrip('0').rstrip('.') if tree.dist else '0'

    json_nodes.append({
        'id': root_id,
        'parent': 'root',
        'name': tree.name if tree.name else '1',
        'customLabel': root_value,
        'level': 1,
        'link': {
            'color': f"getLinkColor('{root_value}')"
        }
    })

    for child in tree.get_children():
        process_node(child, root_id, 2)

    return json_nodes

def save_as_js_object(data, output_path):
    with open(output_path, 'w') as f:
        f.write("[\n")
        for i, node in enumerate(data):
            items = []
            for key, value in node.items():
                if isinstance(value, dict):
                    if key == 'link':
                        # Write color function call directly
                        inner = ", ".join([f"{k}: {v}" for k, v in value.items()])
                        items.append(f"{key}: {{ {inner} }}")
                    else:
                        inner = ", ".join([f"{k}: '{v}'" for k, v in value.items()])
                        items.append(f"{key}: {{ {inner} }}")
                elif isinstance(value, int):
                    items.append(f"{key}: {value}")
                else:
                    items.append(f"{key}: '{value}'")
            line = "  { " + ", ".join(items) + " }"
            if i < len(data) - 1:
                line += ","
            f.write(line + "\n")
        f.write("]\n")

# === File Handling ===
input_path = r"C:\Users\amgot\OneDrive\Desktop\Edgar Internship\EDGAR_Test\Main\newicks\EDGAR_Xanthomonas_fasttree.newick"
output_path = os.path.splitext(input_path)[0] + ".json"

# Read the Newick file
with open(input_path, 'r') as file:
    newick_data = file.read()

# Convert and save
custom_nodes = newick_to_custom_format(newick_data)
save_as_js_object(custom_nodes, output_path)

print(f"Custom-format tree saved to: {output_path}")
print("Conversion completed successfully.")
