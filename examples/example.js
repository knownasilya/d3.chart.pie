(function() {
  var data = [
    { label: 'one', value: 2 },
    { label: 'two', value: 5 },
    { label: 'three', value: 1.5 },
    { label: 'other', value: 1 }
  ],
  pie = d3.select('#pie')
    .append('svg')
      .attr('width', 450)
      .attr('height', 300)
      .chart('Pie', {
        width: 450,
        height: 300,
        radius: 100,
        donutHole: {
          radius: 80,
          color: 'white'
        },
        labelTemplate: '{label}: {value}',
        //labels: false,
        legend: true
      });

  pie.draw(data);
}());
