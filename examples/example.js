(function() {
  var data = [
    { label: 'one', value: 2 },
    { label: 'two', value: 5 },
    { label: 'three', value: 1.5 },
    { label: 'other', value: 1 }
  ],
  pie,
  legend;

  // YOUR SAMPLE CHART USAGE GOES HERE.
  pie = d3.select('#pie')
    .append('svg')
      .attr('width', 450)
      .attr('height', 300)
      .chart('Pie', {
        radius: 100,
        innerRadius: 80,
        labelTemplate: '{label}: {value}',
        labels: false,
        legend: {
          x: 250,
          y: 50
        }
      });

  legend = d3.select('#legend')
    .append('svg')
      .attr('width', 450)
      .attr('height', 300)
      .chart('Legend');

  pie.draw(data);
  legend.draw(data);
}());
