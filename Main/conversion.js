const fs = require('fs');
const path = require('path');

// === Newick Parser ===
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
                let prevToken = tokens[i - 1];
                if (prevToken === ':' && typeof tree.dist === 'undefined') {
                    tree.dist = parseFloat(token);
                } else if (token !== ';') {
                    tree.name = token;
                }
        }
    }
    return tree;
}

// === Helper Function ===
function getMaxDepth(node, depth = 1) {
    if (!node.children || node.children.length === 0) return depth;
    return Math.max(...node.children.map(child => getMaxDepth(child, depth + 1)));
}

// === Converter ===
function newickToCustomFormat(tree) {
    let jsonNodes = [{ id: 'root', name: 'Root', level: 0 }];
    let nodeCounter = 0;

    function createNodeId() {
        return `Internal_node${nodeCounter++}`;
    }

    const maxDepth = getMaxDepth(tree, 2); // Root starts at level 1

    function processNode(node, parentId, currentLevel) {
        if (!node.children || node.children.length === 0) {
            const value = node.dist ? parseFloat(node.dist).toFixed(9).replace(/0+$/, '').replace(/\.$/, '') : '0';
            jsonNodes.push({
                id: node.name,
                parent: parentId,
                name: node.name,
                customLabel: value,
                level: maxDepth,
            });
        } else {
            const currentId = createNodeId();
            let name = node.name?.trim() || '1';
            if (name.includes('.')) {
                name = name.replace(/0+$/, '').replace(/\.$/, '');
            }
            const value = node.dist ? parseFloat(node.dist).toFixed(9).replace(/0+$/, '').replace(/\.$/, '') : '0';

            jsonNodes.push({
                id: currentId,
                parent: parentId,
                name: name,
                customLabel: value,
                level: currentLevel,
            });

            node.children.forEach(child => processNode(child, currentId, currentLevel + 1));
        }
    }

    // Process root
    const rootId = createNodeId();
    const rootValue = tree.dist ? parseFloat(tree.dist).toFixed(9).replace(/0+$/, '').replace(/\.$/, '') : '0';

    jsonNodes.push({
        id: rootId,
        parent: 'root',
        name: tree.name || '1',
        customLabel: rootValue,
        level: 1,
    });

    tree.children?.forEach(child => processNode(child, rootId, 2));

    return jsonNodes;
}

// === File I/O ===
const inputPath = "C:/Users/amgot/OneDrive/Desktop/Edgar Internship/EDGAR_Test/Main/newicks/EDGAR_Xanthomonas_fasttree.newick"; // <-- Paste your file path here
const outputPath = inputPath.replace(".newick", ".json");

if (!fs.existsSync(inputPath)) {
    console.error("❌ File not found. Please check the input path.");
    process.exit(1);
}

const newickData = fs.readFileSync(inputPath, 'utf8');
const parsedTree = parseNewick(newickData);
const jsonResult = newickToCustomFormat(parsedTree);

// === Save to .js without customTreeData ===
const outputJS = JSON.stringify(jsonResult, null, 2)
    .replace(/"getLinkColor\('([^']+)'\)"/g, "getLinkColor('$1')") + "\n"; // Removed 'customTreeData' and trailing semicolon

fs.writeFileSync(outputPath, outputJS, 'utf8');

console.log("Custom-format JS tree saved to: " + outputPath);
console.log("Conversion completed successfully.");
