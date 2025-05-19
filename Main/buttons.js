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



