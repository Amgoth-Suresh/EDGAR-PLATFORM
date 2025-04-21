import ete3

def newick_to_custom_format(newick_str):
    tree = ete3.Tree(newick_str, format=1)
    json_nodes = [{'id': 'root', 'name': 'Root'}]

    main_branches = tree.get_children()
    for idx, branch in enumerate(main_branches, 1):
        branch_id = f'Internal_node{idx}'
        bootstrap = branch.name.strip() if branch.name else '1'
        if '.' in bootstrap:
            bootstrap = bootstrap.rstrip('0').rstrip('.')
        name = bootstrap if bootstrap else '1'
        custom_label = f"{branch.dist:.9f}".rstrip('0').rstrip('.') if branch.dist is not None else '0'

        json_nodes.append({
            'id': branch_id,
            'parent': 'root',
            'name': name,
            'customLabel': custom_label
        })

        stack = [(branch, branch_id)]
        while stack:
            current_node, parent_id = stack.pop()
            child_count = 0
            for child in reversed(current_node.get_children()):
                if child.is_leaf():
                    json_nodes.append({
                        'id': child.name,
                        'parent': parent_id,
                        'name': child.name,
                        'customLabel': f"{child.dist:.9f}".rstrip('0').rstrip('.') if child.dist else '0'
                    })
                else:
                    child_count += 1
                    child_id = f"{parent_id}.{child_count}"
                    child_bootstrap = child.name.strip() if child.name else '1'
                    if '.' in child_bootstrap:
                        child_bootstrap = child_bootstrap.rstrip('0').rstrip('.')
                    child_name = child_bootstrap if child_bootstrap else '1'
                    child_custom_label = f"{child.dist:.9f}".rstrip('0').rstrip('.') if child.dist else '0'
                    json_nodes.append({
                        'id': child_id,
                        'parent': parent_id,
                        'name': child_name,
                        'customLabel': child_custom_label
                    })
                    stack.append((child, child_id))

    return json_nodes

def print_custom_format(data):
    print("[")
    for i, node in enumerate(data):
        parts = [f"{key}: '{value}'" for key, value in node.items()]
        line = "  { " + ", ".join(parts) + " }"
        if i < len(data) - 1:
            line += ","
        print(line)
    print("]")

# Example usage
newick_data = ""
custom_nodes = newick_to_custom_format(newick_data)
print_custom_format(custom_nodes)
