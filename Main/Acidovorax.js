import { getLinkColor, getLinkColorByBootStrap } from './functions.js';
import { getMaxDepth, buildGeneSetRecursively, annotateTreeWithCoreAndTotalGenes } from './functions.js';
import { setupToggleBootstrapButton, setupToggleLinkColorButton } from './buttons.js';

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

    // Attach gene sets for leaf nodes from geneCounts
    data.forEach(p => {
      if (geneCounts[p.id]) {
        p.geneSet = new Set(geneCounts[p.id]);
      }
    });

    // Annotate core + total gene counts dynamically (all nodes)
    annotateTreeWithCoreAndTotalGenes(data, geneCounts);

    // Identify root nodes
    const roots = data.filter(p => !p.parent || p.parent === '');
    roots.forEach(root => {
      buildGeneSetRecursively(root.id, map, data);
    });

    // Propagate bootstrap values
    const queue = [...roots];
    while (queue.length > 0) {
      const node = queue.shift();
      const isInternalNode = node.id.startsWith('Internal') || node.id === 'root';
      if (isInternalNode && /^[+-]?\d+(\.\d+)?$/.test(node.name)) {
        node.bootstrap = parseFloat(node.name);
      }
      const children = data.filter(p => p.parent === node.id);
      children.forEach(child => {
        child.inheritedBootstrap = node.bootstrap ?? node.inheritedBootstrap;
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
          load: function() {
            this.bootstrapVisible = true;
          }
        }
      },
      title: {
        text: `${title} Phylogenetic Tree`
      },
      tooltip: {
        pointFormatter: function() {
          const nameStr = String(this.name);
          const coreGenes = this.core_genes ?? 'N/A';
          const totalGenes = this.total_genes ?? (this.geneSet?.size ?? 'N/A');
          const branchLen = `<b>Branch Length:</b> ${this.customLabel || 'N/A'}<br>`;
          const bootstrap = `<b>BootStrap Value:</b> ${nameStr}<br>`;
          return `<b>Number of Genes:</b> ${totalGenes}<br><b>Core Genes:</b> ${coreGenes}<br>${bootstrap}${branchLen}`;
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
          formatter: function() {
            const chart = this.series.chart;
            const nameStr = String(this.name);
            const isNumeric = /^[+-]?\d+(\.\d+)?$/.test(nameStr);
            if (isNumeric && !chart.bootstrapVisible == false) {
              return '';
            } else {
              return '<span style="font-size: 12px;">' + this.name + '</span>';
            }
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
            click: function() {
              if (!this.children || this.children.length === 0) {
                if (!this.id.startsWith('Internal') && this.id !== 'root') {
                  const newLabel = prompt('Edit node label:', this.name);
                  if (newLabel !== null) {
                    this.update({ name: newLabel });
                  }
                }
              }
            }
          }
        }
      }]
    });

    setupToggleLinkColorButton(chart, data);
  })
  .catch(error => {
    console.error("Failed to load or process JSON:", error);
  });
