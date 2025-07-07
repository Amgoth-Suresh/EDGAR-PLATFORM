const fs = require('fs');
const path = require('path');

/**
 * Parses a Newick string into a nested JavaScript object.
 */
function parseNewick(newick) {
    let ancestors = [];
    let tree = {};
    let tokens = newick.split(/\s*(;|\(|\)|,|:)\s*/);
    let subtree;

    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        switch (token) {
            case '(':
                subtree = {};
                if (!tree.children) tree.children = [];
                tree.children.push(subtree);
                ancestors.push(tree);
                tree = subtree;
                break;
            case ',':
                subtree = {};
                ancestors[ancestors.length - 1].children.push(subtree);
                tree = subtree;
                break;
            case ')':
                tree = ancestors.pop();
                break;
            case ':':
                break;
            default:
                if (tokens[i - 1] === ':') {
                    tree.dist = parseFloat(token);
                } else if (token !== ';') {
                    tree.name = token;
                }
        }
    }
    return tree;
}

/**
 * Recursively finds the maximum depth of the tree.
 */
function getMaxDepth(node, depth = 1) {
    if (!node.children || node.children.length === 0) return depth;
    return Math.max(...node.children.map(child => getMaxDepth(child, depth + 1)));
}

/**
 * Formats distance values by trimming trailing zeros and decimal points.
 */
function formatDistance(dist) {
    return dist ? parseFloat(dist).toFixed(9).replace(/0+$/, '').replace(/\.$/, '') : '0';
}

/**
 * Converts a parsed Newick tree to a custom flat JSON format with node info.
 */
function newickToCustomFormat(tree) {
    const jsonNodes = [];

    // Add dummy root node for visualization anchoring
    jsonNodes.push({ id: 'root', name: 'Root', level: 0 });

    let nodeCounter = 0;

    function createNodeId() {
        return `Internal_node${nodeCounter++}`;
    }

    const maxDepth = getMaxDepth(tree, 2);

    function formatLabel(label) {
        if (!label) return '1';
        label = label.trim();
        if (!isNaN(label)) {
            const num = parseFloat(label);
            return Number.isInteger(num) ? num.toString() : num.toFixed(9).replace(/0+$/, '').replace(/\.$/, '');
        }
        return label;
    }

    function processNode(node, parentId, currentLevel) {
        if (!node.children || node.children.length === 0) {
            jsonNodes.push({
                id: node.name,
                parent: parentId,
                name: formatLabel(node.name),
                customLabel: formatDistance(node.dist),
                level: maxDepth,
            });
        } else {
            const currentId = createNodeId();
            const label = formatLabel(node.name);

            jsonNodes.push({
                id: currentId,
                parent: parentId,
                name: label,
                customLabel: formatDistance(node.dist),
                level: currentLevel,
            });

            node.children.forEach(child => processNode(child, currentId, currentLevel + 1));
        }
    }

    const rootId = createNodeId();
    const rootLabel = formatLabel(tree.name);

    jsonNodes.push({
        id: rootId,
        parent: 'root', // Link real tree to dummy root
        name: rootLabel,
        customLabel: formatDistance(tree.dist),
        level: 1,
    });

    tree.children?.forEach(child => processNode(child, rootId, 2));

    return jsonNodes;
}


// === Main Execution ===

// 👇 Replace with your input file path
const inputPath = "C:/Users/amgot/OneDrive/Desktop/Edgar Internship/EDGAR_Test/Main/newicks/EDGAR_Acidovorax_fasttree.newick";
const outputPath = inputPath.replace(".newick", ".json");

// Check if input file exists
if (!fs.existsSync(inputPath)) {
    console.error("❌ File not found. Please check the input path.");
    process.exit(1);
}

// Read and convert the Newick file
const newickData = fs.readFileSync(inputPath, 'utf8');
const parsedTree = parseNewick(newickData);
const jsonResult = newickToCustomFormat(parsedTree);

// Save as .json file
fs.writeFileSync(outputPath, JSON.stringify(jsonResult, null, 2), 'utf8');

console.log("✅ Tree converted to custom JSON format:");
console.log("📁 Saved to:", outputPath);
