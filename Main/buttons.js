// button.js
export function setupToggleBootstrapButton() {
  const btn = document.getElementById('toggle-bootstrap');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const chart = Highcharts.charts.find(c => c && c.renderTo.id === 'container');
    if (chart) {
      chart.bootstrapVisible = !chart.bootstrapVisible;

      chart.series[0].update({
        dataLabels: {
          formatter: function () {
            const chart = this.series.chart;
            const nameStr = String(this.name);
            const isNumeric = /^[+-]?\d+(\.\d+)?$/.test(nameStr);
            if (isNumeric && !chart.bootstrapVisible) {
              return '';
            } else {
              return '<span style="font-size: 12px;">' + this.name + '</span>';
            }
          }
        }
      }, false);

      chart.redraw();
      btn.innerText = chart.bootstrapVisible ? 'Hide Bootstrap Values' : 'Show Bootstrap Values';
    }
  });
}


import { getLinkColor, getLinkColorByBootStrap } from './functions.js';
export function setupToggleLinkColorButton(chart, data) {
  const button = document.getElementById('toggleBootstrapColor');
  let colorMode = 'customLabel'; // start with bootstrap coloring

  button.addEventListener('click', () => {
    colorMode = colorMode === 'bootstrap' ? 'customLabel' : 'bootstrap';

    data.forEach(point => {
      if (!point.parent) return;
      const color = colorMode === 'bootstrap'
        ? getLinkColorByBootStrap(point.inheritedBootstrap || 0)
        : getLinkColor(point.customLabel);

      point.link = {
        color: color,
        lineWidth: 5
      };
    });

    chart.series[0].setData(data, true, false, false);

    // Update button text
    button.innerText = colorMode === 'bootstrap' ? 'Color Based on Branch Lengths' : 'Color Based on Bootstrap Values';
  });

  // Set initial button text
  button.innerText = 'Color Based on Bootstrap Values';
}

