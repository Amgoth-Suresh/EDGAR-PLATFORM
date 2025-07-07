// functions.js
export function getLinkColor(value) {
  const num = parseFloat(value);
  if (num < 0.001) return '#2ECC71';     // green
  if (num < 0.01) return '#F1C40F';      // yellow
  if (num < 0.1) return '#E67E22';       // orange
  return '#E74C3C';                      // red
}

export function getMaxDepth(data) {
  const map = new Map();
  data.forEach(point => map.set(point.id, point));

  function depth(nodeId) {
    const node = map.get(nodeId);
    if (!node || !node.parent || node.parent === '') return 1;
    return 1 + depth(node.parent);
  }

  return Math.max(...data.map(d => depth(d.id)));
}

export function getLinkColorByBootStrap(BootstrapValue) {
  const num = parseFloat(BootstrapValue);
  if (num === 1) return 'green';
  else if (num >= 0.6 && num < 1) return 'orange';
  return 'red';
}

export function buildGeneSetRecursively(nodeId, map, data) {
  const node = map.get(nodeId);
  if (!node) return new Set();

  // Already computed
  if (node.geneSet && node.geneSet.size > 0) {
    return node.geneSet;
  }

  const children = data.filter(p => p.parent === nodeId);
  let combined = new Set();

  for (const child of children) {
    const childSet = buildGeneSetRecursively(child.id, map, data);
    childSet.forEach(g => combined.add(g));
  }

  node.geneSet = combined;
  return combined;
}
export function annotateTreeWithCoreAndTotalGenes(data, geneCounts) {
  const map = new Map();
  data.forEach(d => map.set(d.id, d));

  function getDescendantStrains(nodeId) {
    const children = data.filter(d => d.parent === nodeId);
    if (!children.length) {
      return geneCounts[nodeId] ? [nodeId] : [];
    }
    return children.flatMap(child => getDescendantStrains(child.id));
  }

  function getCoreGenes(strains) {
    if (!strains.length) return [];
    const sets = strains.map(strain => new Set(geneCounts[strain] || []));
    return [...sets.reduce((acc, set) => new Set([...acc].filter(g => set.has(g))))];
  }

  function getUnionGenes(strains) {
    const all = new Set();
    strains.forEach(strain => {
      (geneCounts[strain] || []).forEach(g => all.add(g));
    });
    return [...all];
  }

  data.forEach(node => {
    const children = data.filter(d => d.parent === node.id);

    if (!children.length && geneCounts[node.id]) {
      // Leaf node
      const totalGenes = geneCounts[node.id].length;
      const parentId = node.parent;
      const siblingNodes = data.filter(d => d.parent === parentId && d.id !== node.id);

      // Collect all descendant strains from siblings
      const siblingStrains = siblingNodes.flatMap(sibling => getDescendantStrains(sibling.id));

      if (siblingStrains.length > 0) {
        const siblingCore = getCoreGenes(siblingStrains);
        const strainGeneSet = new Set(geneCounts[node.id]);
        const localCoreGenes = siblingCore.filter(g => strainGeneSet.has(g));
        node.core_genes = localCoreGenes.length;
      } else {
        node.core_genes = 0;  // No meaningful comparison
      }

      node.total_genes = totalGenes;
    } else {
      // Internal node
      const strains = getDescendantStrains(node.id);
      node.core_genes = getCoreGenes(strains).length;
      node.total_genes = getUnionGenes(strains).length;
    }
  });
}





