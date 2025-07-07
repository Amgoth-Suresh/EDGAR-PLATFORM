import json
import re
from pathlib import Path

def parse_newick(newick_str):
    tokens = re.split(r'\s*(;|\(|\)|,|:)\s*', newick_str)
    tokens = [t for t in tokens if t not in ['', ';']]
    tree = {}
    ancestors = []
    subtree = None

    i = 0
    while i < len(tokens):
        token = tokens[i]
        if token == '(':
            subtree = {}
            tree.setdefault('children', []).append(subtree)
            ancestors.append(tree)
            tree = subtree
        elif token == ',':
            subtree = {}
            ancestors[-1].setdefault('children', []).append(subtree)
            tree = subtree
        elif token == ')':
            tree = ancestors.pop()
        elif token == ':':
            pass
        else:
            prev_token = tokens[i - 1] if i > 0 else None
            if prev_token == ':':
                tree['dist'] = float(token)
            else:
                tree['name'] = token
        i += 1
    return tree

def get_max_depth(node, depth=1):
    if 'children' not in node or not node['children']:
        return depth
    return max(get_max_depth(child, depth + 1) for child in node['children'])

def format_distance(dist):
    if dist is None:
        return '0'
    s = f"{float(dist):.9f}".rstrip('0').rstrip('.')
    return s or '0'

def format_label(label):
    if not label:
        return '1'
    label = str(label).strip()
    try:
        num = float(label)
        return str(int(num)) if num.is_integer() else format_distance(num)
    except ValueError:
        return label

def newick_to_custom_format(tree):
    json_nodes = [{'id': 'root', 'name': 'Root', 'level': 0}]
    node_counter = [0]

    def create_node_id():
        node_counter[0] += 1
        return f"Internal_node{node_counter[0] - 1}"

    max_depth = get_max_depth(tree, 2)

    def process_node(node, parent_id, current_level):
        if 'children' not in node or not node['children']:
            json_nodes.append({
                'id': node.get('name'),
                'parent': parent_id,
                'name': format_label(node.get('name')),
                'customLabel': format_distance(node.get('dist')),
                'level': max_depth
            })
        else:
            current_id = create_node_id()
            json_nodes.append({
                'id': current_id,
                'parent': parent_id,
                'name': format_label(node.get('name')),
                'customLabel': format_distance(node.get('dist')),
                'level': current_level
            })
            for child in node['children']:
                process_node(child, current_id, current_level + 1)

    root_id = create_node_id()
    json_nodes.append({
        'id': root_id,
        'parent': 'root',
        'name': format_label(tree.get('name')),
        'customLabel': format_distance(tree.get('dist')),
        'level': 1
    })

    for child in tree.get('children', []):
        process_node(child, root_id, 2)

    return json_nodes

# === MAIN EXECUTION ===

input_file = "newicks/EDGAR_Acidovorax_fasttree.newick"  # Replace with your file
output_file = input_file.replace(".newick", ".json")

if not Path(input_file).exists():
    print(f"❌ File not found: {input_file}")
else:
    with open(input_file, 'r') as f:
        newick_string = f.read()

    parsed = parse_newick(newick_string)
    result = newick_to_custom_format(parsed)

    with open(output_file, 'w') as f:
        json.dump(result, f, indent=2)

    print(f"✅ Conversion complete! JSON saved to: {output_file}")
