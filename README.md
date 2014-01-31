d3.chart.pie
============

Pie/Donut chart using d3 and d3.chart. 

Inspired and based on [this][4] jsfiddle by [Steve Boak][5].

[![Dependencies](https://david-dm.org/knownasilya/d3.chart.pie.png)](https://david-dm.org/knownasilya/d3.chart.pie)  
[![Gitter chat](https://badges.gitter.im/knownasilya/d3.chart.pie.png)](https://gitter.im/knownasilya/d3.chart.pie)

## Usage

```js
  // Appends the chart to an 'svg' element.
  var chart = d3.select('body')
    .append('svg')
    .height(350)
    .width(400)
    .chart('Pie', {
      radius: 100,
      innerRadius: 80,
      labelTemplate: '[{label}]' // [my label]
    });

  // Draws graph once you add data.
  chart.draw([
    {
      label: 'my label',
      value: 3
    }, {
      label: 'your label',
      value: 0.5
    }, {
      label: 'other label',
      value: 1
    }
  ]);
```


### Available Options & Defaults

```js
  {
    radius: 100,
    innerRadius: 0,
    width: 450, // Or container's width
    height: 300, // Or container's height
    labelTemplate: '{label}',
    labels: undefined,
    legend: undefined
  }
```

The following options are available for `legend`:

```js
{
  x: int|float,
  y: int|float
}
```

Not specifying the `innerRadius` value will create a Pie chart, rather then a Donut chart. 


## Contributing

See the following links:

1. [d3.chart quickstart][1]
2. [d3.chart API reference][2]
3. [d3 API][3]

[1]: https://github.com/misoproject/d3.chart/wiki/quickstart
[2]: http://misoproject.com/d3-chart/api.html
[3]: https://github.com/mbostock/d3/wiki/API-Reference
[4]: http://jsfiddle.net/stephenboak/hYuPb/
[5]: http://www.stephenboak.com/
