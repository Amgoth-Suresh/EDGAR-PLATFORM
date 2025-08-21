// Acidovorax.js
import {
  getLinkColor,
  getLinkColorByBootStrap,
  getMaxDepth,
  buildGeneSetRecursively,
  annotateTreeWithCoreAndTotalGenes,
  downloadCSV
} from './functions.js';

import {
  setupToggleBootstrapButton,
  setupToggleLinkColorButton,
  setupToggleCoreGeneLabelButton
} from './buttons.js';

// ===== 1) Disable collapse ONLY on Shift+Click (safe wrapper) =====
let suppressNextCollapse = false;

// Mark Shift+Click inside the chart container before Highcharts handles it
document.addEventListener(
  'mousedown',
  (e) => {
    if (e.shiftKey && e.target.closest?.('#container')) {
      suppressNextCollapse = true;
    }
  },
  true // capture phase
);

// Safely obtain the treegraph point class and wrap toggleCollapse
(function setupTreegraphWrap() {
  const sg = Highcharts.seriesTypes?.treegraph;
  const PointClass = sg?.prototype?.pointClass; // safe access

  if (PointClass?.prototype?.toggleCollapse) {
    Highcharts.wrap(PointClass.prototype, 'toggleCollapse', function (proceed, a, flag) {
      if (suppressNextCollapse) {
        suppressNextCollapse = false; // consume once
        return; // block built-in expand/collapse
      }
      return proceed.apply(this, Array.prototype.slice.call(arguments, 1));
    });
  } else {
    console.warn('[treegraph] toggleCollapse not found; collapse suppression unavailable.');
  }
})();

// ===== UI state =====
window.coreGeneLabelVisible = false;

document.addEventListener("DOMContentLoaded", () => {
  setupToggleBootstrapButton();
});

fetch('newicks/EDGAR_Acidovorax_fasttree.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json().then(data => ({ data, url: response.url }));
  })
  .then(({ data, url }) => {
    if (!Array.isArray(data)) {
      throw new Error("Expected data to be an array.");
    }

    const fileName = url.split('/').pop();
    const title = fileName.replace('.json', '').replace('EDGAR_', '');

    const map = new Map();
    data.forEach(p => map.set(p.id, p));

    // ===== 2) Attach gene sets for leaf nodes from geneCounts (robust) =====
    let matchedById = 0, matchedByName = 0;
    data.forEach(p => {
      if (geneCounts?.[p.id]?.length) {
        p.geneSet = new Set(geneCounts[p.id]);
        matchedById++;
        return;
      }
      // optional fallback: try by exact name
      if (geneCounts?.[p.name]?.length) {
        p.geneSet = new Set(geneCounts[p.name]);
        matchedByName++;
      }
    });
    // console.log(`[genes] matched by id=${matchedById}, by name=${matchedByName}`);

    // Annotate core + total gene counts dynamically (fills core_gene_list, etc.)
    annotateTreeWithCoreAndTotalGenes(data, geneCounts);

    // Identify and process root nodes
    const roots = data.filter(p => !p.parent || p.parent === '');
    roots.forEach(root => {
      buildGeneSetRecursively(root.id, map, data);
    });

    // ===== 3) Materialize stable numeric fields used by tooltips/labels =====
    data.forEach(p => {
      // total genes
      const size = p.geneSet instanceof Set
        ? p.geneSet.size
        : Array.isArray(p.geneSet)
          ? p.geneSet.length
          : 0;
      p.total_genes = size;

      // core genes (expect annotateTreeWithCoreAndTotalGenes to set core_gene_list)
      if (Array.isArray(p.core_gene_list)) {
        p.core_genes = p.core_gene_list.length;
      }
    });

    // Propagate bootstrap values
    const queue = [...roots];
    while (queue.length > 0) {
      const node = queue.shift();
      const isInternalNode = node.id.startsWith('Internal') || node.id === 'root';
      if (isInternalNode && /^[+-]?\d+(\.\d+)?$/.test(String(node.name))) {
        node.bootstrap = parseFloat(node.name);
      }
      const children = data.filter(p => p.parent === node.id);
      children.forEach(child => {
        child.inheritedBootstrap = node.bootstrap ?? child.inheritedBootstrap;
        queue.push(child);
      });
    }

    // Assign link colors
    data.forEach(point => {
      if (point.parent) {
        const parent = map.get(point.parent);
        const bootstrapValue = parent?.inheritedBootstrap || 0;
        const customColor = getLinkColor(point.customLabel);
        const bootstrapColor = getLinkColorByBootStrap(bootstrapValue);

        point.linkColors = {
          custom: customColor,
          bootstrap: bootstrapColor
        };

        point.link = {
          color: customColor,
          lineWidth: 5
        };
      }
    });

    // Dynamic chart height
    const maxDepth = getMaxDepth(data);
    const heightPerLevel = 150;
    const calculatedHeight = Math.max(400, maxDepth * heightPerLevel);
    document.getElementById('container').style.height = `${calculatedHeight}px`;

    // Render treegraph
    const chart = Highcharts.chart('container', {
      chart: {
        spacingBottom: 30,
        marginRight: 400,
        events: {
          load: function () {
            this.bootstrapVisible = false;

            const points = this.series[0].points;
            const pointMap = new Map(points.map(p => [p.id, p]));

            points.forEach(point => {
              const isLeaf = !points.some(p => p.parent === point.id);
              if (isLeaf && point.parent) {
                const parent = pointMap.get(point.parent);
                if (parent && parent.color) {
                  point.options.color = parent.color;
                  point.color = parent.color;
                  point.update({}, false);
                }
              }
            });

            this.redraw();
          }
        }
      },
      title: {
        text: `${title} Phylogenetic Tree`
      },
      tooltip: {
        pointFormatter: function () {
          const nameStr = String(this.name);
          const totalGenes = this.total_genes ?? (this.geneSet?.size ?? 'N/A');
          const branchLen = `<b>Branch Length:</b> ${this.customLabel || 'N/A'}<br>`;
          const isInternal = this.id?.startsWith('Internal') || this.id === 'root';

          let tooltip = `<b>Number of Genes:</b> ${totalGenes}<br>`;

          if (isInternal) {
            const coreGenes = this.core_genes ?? 'N/A';
            tooltip += `<b>Core Genes:</b> ${coreGenes}<br>`;
            tooltip += `<b>Bootstrap Value:</b> ${nameStr}<br>`;
          } else {
            tooltip += `<b>Strain Name:</b> ${nameStr}<br>`;
          }

          tooltip += branchLen;
          return tooltip;
        }
      },
      series: [{
        type: 'treegraph',
        data: data,
        marker: {
          symbol: 'circle',
          radius: 8,
          fillColor: '#ffffff',
          lineWidth: 3
        },
        dataLabels: {
          align: 'left',
          linkFormat: '<span style="color: green; font-size: 8px;">{point.customLabel}</span>',
          formatter: function () {
            const chart = this.series.chart;
            const isInternal = this.id?.startsWith('Internal') || this.id === 'root';
            const isBootstrap = /^[+-]?\d+(\.\d+)?$/.test(String(this.name));

            if (isInternal && window.coreGeneLabelVisible) {
              return `<span style="font-size: 10px;">Core Genes: ${this.core_genes ?? 'N/A'}</span>`;
            }

            if (isBootstrap) {
              return chart.bootstrapVisible
                ? `<span style="font-size: 10px;">${this.name}</span>`
                : '';
            }

            return `<span style="font-size: 12px;">${this.name}</span>`;
          },
          pointerEvents: 'none',
          style: {
            color: '#000000',
            textOutline: '3px #ffffff',
            whiteSpace: 'nowrap'
          },
          x: 10,
          crop: false,
          overflow: 'none'
        },
        levels: [{
          level: 2,
          colorByPoint: true
        }],
        point: {
          events: {
            click: function (event) {
              const clickedNode = this;
              const originalEvent = event?.originalEvent || event || window.event;

              if (originalEvent?.shiftKey) {
                const parentNode = chart.series[0].points.find(p => p.id === clickedNode.parent);

                if (!parentNode || !Array.isArray(clickedNode.core_gene_list) || !Array.isArray(parentNode.core_gene_list)) {
                  alert("Core gene data missing for this node or its parent.");
                  return;
                }

                const childCoreGenes = new Set(clickedNode.core_gene_list);
                const parentCoreGenes = new Set(parentNode.core_gene_list);
                const gainedGenes = [...childCoreGenes].filter(g => !parentCoreGenes.has(g));

                let csvContent = "Gene Name,Description\n";

                if (gainedGenes.length === 0) {
                  csvContent += "No differences,N/A";
                } else {
                  for (const gene of gainedGenes) {
                    const description = geneDescriptions?.[gene] || "N/A";
                    // basic CSV escaping
                    const safeGene = String(gene).replace(/"/g, '""');
                    const safeDesc = String(description).replace(/"/g, '""');
                    csvContent += `"${safeGene}","${safeDesc}"\n`;
                  }
                }

                downloadCSV(csvContent, `${clickedNode.id}_gained_genes.csv`);
                return;
              }

              if (!clickedNode.id.startsWith('Internal') && clickedNode.id !== 'root') {
                const newLabel = prompt('Edit node label:', clickedNode.name);
                if (newLabel !== null) {
                  this.update({ name: newLabel });
                }
              }
            }
          }
        }
      }]
    });

    // Setup interactivity
    setupToggleLinkColorButton(chart, data);
    setupToggleCoreGeneLabelButton(chart);
  })
  .catch(error => {
    console.error("Failed to load or process JSON:", error);
  });
