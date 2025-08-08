import { getLinkColor, getLinkColorByBootStrap } from './functions.js';

// ✅ Bootstrap Toggle
export function setupToggleBootstrapButton() {
  const btn = document.getElementById('toggle-bootstrap');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const chart = Highcharts.charts.find(c => c && c.renderTo.id === 'container');
    if (!chart) return;

    chart.bootstrapVisible = !chart.bootstrapVisible;

    // Re-evaluate all labels
    chart.series[0].points.forEach(p => p.update({}, false));
    chart.redraw();

    btn.innerText = chart.bootstrapVisible
      ? 'Hide Bootstrap Values'
      : 'Show Bootstrap Values';
  });
}

// ✅ Link Color Toggle
// ✅ Link Color Toggle (with dynamic legend switching)
export function setupToggleLinkColorButton(chart, data) {
  const button = document.getElementById('toggleBootstrapColor');
  let colorMode = 'customLabel'; // start with customLabel

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
    button.innerText = colorMode === 'bootstrap'
      ? 'Color Based on Branch Lengths'
      : 'Color Based on Bootstrap Values';

    // ✅ Toggle legends
    const customLegend = document.getElementById('linkColorLegend');
    const bootstrapLegend = document.getElementById('bootstrapColorLegend');

    if (customLegend && bootstrapLegend) {
      if (colorMode === 'bootstrap') {
        customLegend.style.display = 'none';
        bootstrapLegend.style.display = 'block';
      } else {
        customLegend.style.display = 'block';
        bootstrapLegend.style.display = 'none';
      }
    }
  });

  button.innerText = 'Color Based on Bootstrap Values';
}


// ✅ Core Gene Count Toggle
export function setupToggleCoreGeneLabelButton(chart) {
  window.coreGeneLabelVisible = false;

  const btn = document.getElementById("toggle-core-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.coreGeneLabelVisible = !window.coreGeneLabelVisible;

    btn.textContent = window.coreGeneLabelVisible
      ? "Hide Core Gene Count"
      : "Show Core Gene Count";

    // Re-evaluate all labels
    chart.series[0].points.forEach(p => p.update({}, false));
    chart.redraw();
  });
}
