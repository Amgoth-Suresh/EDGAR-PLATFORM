const fs = require('fs');

function parseNewick(s) {
    var ancestors = [];
    var tree = {};
    var tokens = s.split(/\s*(;|\(|\)|,|:)\s*/);
    var current = tree;
    
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        switch (token) {
            case '(':
                var parent = current;
                current.children = [{}];
                ancestors.push(parent);
                current = current.children[0];
                break;
            case ',':
                var parent = ancestors[ancestors.length - 1];
                parent.children.push({});
                current = parent.children[parent.children.length - 1];
                break;
            case ')':
                current = ancestors.pop();
                break;
            case ':':
                break;
            default:
                var x = tokens[i - 1];
                if (x === ')' || x === '(' || x === ',') {
                    current.name = token;
                } else if (x === ':') {
                    current.length = parseFloat(token);
                }
        }
    }
    return tree;
}

function newickToCustomFormat(newickStr) {
    const jsonNodes = [{ id: 'root', name: 'Root', level: 0 }];
    let nodeCounter = 0;

    const createNodeId = () => `Internal_node${nodeCounter++}`;

    const processNodeName = (name) => {
        let processed = name ? name.trim() : '1';
        if (processed.includes('.')) {
            processed = processed.replace(/0+$/, '');
            processed = processed.replace(/\.$/, '');
        }
        return processed === '' ? '1' : processed;
    };

    const formatDist = (dist) => {
        if (dist === undefined || dist === null) return '0';
        let str = Number(dist).toFixed(9);
        str = str.replace(/0+$/, '');
        if (str.endsWith('.')) str = str.slice(0, -1);
        return str || '0';
    };

    function traverse(node, parentId, currentLevel) {
        if (!node.children || node.children.length === 0) {
            jsonNodes.push({
                id: node.name,
                parent: parentId,
                name: node.name,
                customLabel: formatDist(node.length),
                level: currentLevel
            });
        } else {
            const currentId = createNodeId();
            const name = processNodeName(node.name);
            const customLabel = formatDist(node.length);
            
            jsonNodes.push({
                id: currentId,
                parent: parentId,
                name: name,
                customLabel: customLabel,
                level: currentLevel
            });

            node.children.forEach(child => {
                traverse(child, currentId, currentLevel + 1);
            });
        }
    }

    try {
        const rootNode = parseNewick(newickStr);
        const rootId = createNodeId();
        const rootName = processNodeName(rootNode.name);
        
        jsonNodes.push({
            id: rootId,
            parent: 'root',
            name: rootName,
            customLabel: formatDist(rootNode.length),
            level: 1
        });

        if (rootNode.children) {
            rootNode.children.forEach(child => {
                traverse(child, rootId, 2);
            });
        }

        return jsonNodes;
    } catch (error) {
        throw new Error(`Newick parsing failed: ${error.message}`);
    }
}

function saveAsJsObject(data, outputPath) {
    const content = [
        '[',
        ...data.map((node, i) => {
            const fields = Object.entries(node).map(([key, value]) => 
                key === 'level' ? `${key}: ${value}` : `${key}: '${value}'`
            );
            return `  { ${fields.join(', ')} }${i < data.length - 1 ? ',' : ''}`;
        }),
        ']'
    ].join('\n');

    fs.writeFileSync(outputPath, content);
}

// File paths
const inputPath = "C:\\Users\\amgot\\OneDrive\\Desktop\\Edgar Internship\\EDGAR_Test\\Main\\newicks\\EDGAR_Acidovorax_fasttree.newick";
const outputPath = inputPath.replace(/\.newick$/, '.json');

// Main execution
try {
    const newickData = fs.readFileSync(inputPath, 'utf8');
    const customNodes = newickToCustomFormat(newickData);
    saveAsJsObject(customNodes, outputPath);
    console.log(`Custom-format tree saved to: ${outputPath}`);
    console.log("Conversion completed successfully.");
} catch (error) {
    console.error("Error:", error.message);
}