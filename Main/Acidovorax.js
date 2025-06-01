// main.js
import { getLinkColor, getLinkColorByBootStrap } from './functions.js';
import { getMaxDepth } from './functions.js';
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

    // Build id -> point map
    const map = new Map();
    data.forEach(p => map.set(p.id, p));

    // Identify roots and internal nodes
    const roots = data.filter(p => !p.parent || p.parent === '');
    
    // Propagate bootstrap values using BFS
    const queue = [...roots];
    while (queue.length > 0) {
      const node = queue.shift();
      
      // Only internal nodes can have bootstrap values
      const isInternalNode = node.id.startsWith('Internal') || node.id === 'root';
      if (isInternalNode && /^[+-]?\d+(\.\d+)?$/.test(node.name)) {
        node.bootstrap = parseFloat(node.name);
      }
      
      // Find children
      const children = data.filter(p => p.parent === node.id);
      children.forEach(child => {
        // Inherit bootstrap from parent if available
        child.inheritedBootstrap = node.bootstrap ?? node.inheritedBootstrap;
        queue.push(child);
      });
    }

    // Assign link colors based on parent's bootstrap
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
          color: customColor, // default to customLabel color
          lineWidth: 5
        };
      }
    });

    const maxDepth = getMaxDepth(data);
    const heightPerLevel = 150;
    const calculatedHeight = Math.max(400, maxDepth * heightPerLevel);
    document.getElementById('container').style.height = `${calculatedHeight}px`;

    // Render the chart
    const chart = Highcharts.chart('container', {
      chart: {
        spacingBottom: 30,
        marginRight: 400,
        events: {
          load: function() {
            this.bootstrapVisible = false;
          }
        }
      },
      title: {
        text: `${title} Phylogenetic Tree`
      },
      tooltip: {
        pointFormatter: function() {
          return `<b>BootStrap Value: ${this.name}</b><br><b>Branch Length: ${this.customLabel || 'N/A'}</b><br>`;
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
            if (isNumeric && !chart.bootstrapVisible) {
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
                    this.update({
                      name: newLabel
                    });
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