d3.chart.pie
============

Pie/Donut chart using d3 and d3.chart, see [demo here][7]. 

Inspired and based on [this][4] jsfiddle by [Steve Boak][5].

[![Dependencies](https://david-dm.org/knownasilya/d3.chart.pie.png)](https://david-dm.org/knownasilya/d3.chart.pie)  
[![devDependency Status](https://david-dm.org/knownasilya/d3.chart.pie/dev-status.png)](https://david-dm.org/knownasilya/d3.chart.pie#info=devDependencies)  
[![Gitter chat](https://badges.gitter.im/knownasilya/d3.chart.pie.png)](https://gitter.im/knownasilya/d3.chart.pie)

## Usage

```js
  // Appends the chart to an 'svg' element.
  var chart = d3.select('body')
    .append('svg')
    .attr('width', 450)
    .attr('height', 300)
    .chart('Pie', {
      height: 350,
      width: 400,
      radius: 100,
      donutHole: {
        radius: 80
      }
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

These options are also exist as getter/setters on the chart.

```js
  {
    radius: 100,
    width: 450, // Or container's width
    height: 300, // Or container's height
    labelTemplate: '{label}',
    labels: undefined,
    legend: undefined,
    donutHole: undefined,
    strokeWidth: 0.5,
    colors: d3.scale.category20() //takes a function
  }
```

See [d3.chart.legend][6] for available options and usage.

The following options are available for `donutHole`:

```js
{
  radius: int|float,
  color: valid d3 colors
}
```

Not specifying the `donutHole` object will create a Pie chart, rather then a Donut chart.

The `colors` option (or setter) takes a function and has the following contract:

If the function takes one parameter (e.g. d3.scale.category20()), then it will be passed the index of each data element and should return a color. If the function takes two parameters, it will be passed both the data element and the index and should return a color. Here is an example that uses the setter.

````javascript
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
        legend: false
      })
      .colors(function(d, i){
        var col = d3.scale.ordinal()
          .domain(['one', 'two', 'three', 'other'])
          .range(['crimson', 'coral', 'goldenrod', 'orange']);
        return col(d.label);
      });

  pie.draw(data);
}());
````

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
[6]: https://github.com/knownasilya/d3.chart.legend
[7]: http://jsbin.com/OzoXAQo/2
