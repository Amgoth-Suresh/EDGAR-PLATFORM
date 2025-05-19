// main.js
import { getLinkColor } from './functions.js';
import { getMaxDepth } from './functions.js';
import { setupToggleBootstrapButton } from './buttons.js';

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

    data.forEach(point => {
      if (point.customLabel !== undefined) {
        point.link = {
          color: getLinkColor(point.customLabel),
          lineWidth:5
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
            
            this.bootstrapVisible = false; // Set the default state to true
          }
        }
      },
      title: {
        text: `${title} Phylogenetic Tree` 
      },
      tooltip: {
        pointFormatter: function () {
          return `<b><br>Bootstrap Value: ${this.name}</b><br>Branch Length: ${this.customLabel || 'N/A'}`;
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
              return '<span style="font-size: 12px;">' + this.name + '</span>';  // Show the name otherwise
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
        levels: [{ level: 2, colorByPoint: true }],
        point: {
          events: {
            click: function () {
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
  })
  .catch(error => {
    console.error("Failed to load or process JSON:", error);
  });
