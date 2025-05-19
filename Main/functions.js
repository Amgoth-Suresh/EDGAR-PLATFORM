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