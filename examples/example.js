(function() {
  // YOUR SAMPLE CHART USAGE GOES HERE.
  var chart = d3.select('#vis')
    .append('svg')
      .attr('width', 450)
      .attr('height', 300)
      .chart('Pie', {
        radius: 100,
        innerRadius: 80
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
      label: 'three',
      value: 1.5
    },
    {
      label: 'other',
      value: 1
    }
  ]);

  setTimeout(function () {
    chart.draw([
      {
        label: 'one',
        value: 9
      },
      {
        label: 'two',
        value: 1
      },
      {
        label: 'other',
        value: 3
      }
    ]);
  }, 1500);
}());
