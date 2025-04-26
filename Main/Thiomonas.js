function getLinkColor(value) {
    const num = parseFloat(value); // Convert the value to a float
    if (num < 0.001) return '#2ECC71';     // green
    if (num < 0.01) return '#F1C40F';      // yellow
    if (num < 0.1) return '#E67E22';       // orange
    return '#E74C3C';                      // red
  }
  
  fetch('newicks/EDGAR_Thiomonas.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        data.forEach(point => {
            if (point.customLabel !== undefined) {
                point.link = {
                    color: getLinkColor(point.customLabel) 
                };
            }
        });
  
        Highcharts.chart('container', {
            chart: {
                spacingBottom: 30,
                marginRight: 400
            },
            title: {
                text: 'Phylogenetic language tree'
            },
            tooltip: {
                pointFormatter: function () {
                    return `<b>${this.name}</b><br>Branch Length: ${this.customLabel || 'N/A'}`;
                }
            },
            series: [{
                type: 'treegraph',
                clip: false,
                data: data,
                marker: {
                    symbol: 'circle',
                    radius: 5,
                    fillColor: '#ffffff',
                    lineWidth: 3
                },
                dataLabels: {
                    align: 'left',
                    linkFormat: '<span style="color: green; font-size: 8px;">{point.customLabel}</span>',
                    pointFormat: '{point.name}',
                    pointerEvents: 'none',
                    style: {
                        color: '#000000',
                        textOutline: '3px #ffffff',
                        whiteSpace: 'nowrap'
                    },
                    x: 20,
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
    
  