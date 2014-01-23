(function() {
  // YOUR SAMPLE CHART USAGE GOES HERE.
  var chart = d3.select('#vis')
    .append('svg')
      .attr('width', 450)
      .attr('height', 300)
      .chart('Pie')
      .height(50)
      .width(50)
      .innerRadius(45)
      .radius(100);

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
