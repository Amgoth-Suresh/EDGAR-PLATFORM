// Function to get the color for the link based on customLabel value
function getLinkColor(value) {
  const num = parseFloat(value);
  if (num < 0.001) return '#2ECC71';     // green
  if (num < 0.01) return '#F1C40F';      // yellow
  if (num < 0.1) return '#E67E22';       // orange
  return '#E74C3C';                      // red
}

// Function to calculate max depth
function getMaxDepth(data) {
  const map = new Map();
  data.forEach(point => map.set(point.id, point));

  function depth(nodeId) {
    const node = map.get(nodeId);
    if (!node || !node.parent || node.parent === '') return 1;
    return 1 + depth(node.parent);
  }

  return Math.max(...data.map(d => depth(d.id)));
}

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
          lineWidth:3
        };
      }
    });

    const maxDepth = getMaxDepth(data);
    const heightPerLevel = 150; 
    const calculatedHeight = Math.max(400, maxDepth * heightPerLevel);
    document.getElementById('container').style.height = `${calculatedHeight}px`;

    // Render the chart
    Highcharts.chart('container', {
      chart: {
        spacingBottom: 30,
        marginRight: 400
      },
      title: {
        text: `${title} Phylogenetic Tree` 
      },
      tooltip: {
        pointFormatter: function () {
          return `<b>${this.name}</b><br>Branch Length: ${this.customLabel || 'N/A'}`;
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
          pointFormat: '<span style="font-size: 12px;">{point.name}</span>',
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
