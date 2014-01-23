(function() {
  // YOUR SAMPLE CHART USAGE GOES HERE.
  var chart = d3.select('#vis')
    .append('svg')
      .attr('width', 450)
      .attr('height', 300)
      .chart('Pie', {
        radius: 100,
        innerRadius: 45
      });

  chart.draw([
    {
      label: 'one',
      value: 2
    },
    {
      label: 'two',
      value: 5
    },
    {
      label: 'other',
      value: 1
    }
  ]);
}());
