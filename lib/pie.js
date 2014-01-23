/*
  Data come in an array of objects of the following form:

  { label: <string>, value: <int/float> } 
*/

d3.chart('Pie', {
  initialize: function (options) {
    var pieGroup,
      centerCircleGroup,
      whiteCircle,
      placeholder;

    options = options || {};
    this.width(options.width || this.base.attr('width') || 450);
    this.height(options.height || this.base.attr('height') || 300);
    this.radius(options.radius || 100);
    this.innerRadius(options.innerRadius || 45);

    this.arc = d3.svg.arc()
      .startAngle(function (d) { 
        return d.startAngle; })
      .endAngle(function (d) { 
        return d.endAngle; })
      .innerRadius(this.ir)
      .outerRadius(this.r);
    this.color = d3.scale.category20();
    this.donut = d3.layout.pie().value(function (d) {
      return d.value;
    });

    pieGroup = this.base.append('svg:g')
      .attr('class', 'arc')
      .attr('transform', 'translate(' + (this.w / 2) + ',' + 
        (this.h / 2) + ')');

    // placeholder pie for loading..
    placeholder = pieGroup.append('svg:circle')
        .attr('fill', '#EFEFEF')
        .attr('r', this.r); 

    // center circle group
    centerCircleGroup = this.base.append('svg:g')
      .attr('class', 'center-group')
      .attr('transform', 'translate(' + 
        (this.w / 2) + ',' + (this.h / 2) + ')');

    // center circle - makes donut
    whiteCircle = centerCircleGroup.append('svg:circle')
      .attr('fill', 'white')
      .attr('r', this.ir);


    this.layer('slices', pieGroup, {
      dataBind: function (data) {
        return this.selectAll('path')
          .data(data);
      },

      insert: function () {
        return this.insert('svg:path');
      },

      events: {
        enter: function () {
          var chart = this.chart();

          return this.attr('stroke', 'white')
            .attr('stroke-width', 0.5)
            .attr('fill', function (d, i) { 
                return chart.color(i); 
              })
            .attr('d', chart.arc); 
        }
      }
    });
  },

  transform: function (data) {
    return this.donut(data);
  },

  radius: function (radius) {
    if (arguments.length === 0) {
      return this.r;
    }

    this.r = radius;
    return this;
  },

  innerRadius: function (innerRadius) {
    if (arguments.length === 0) {
      return this.ir;
    }

    this.ir = innerRadius;
    return this;
  },

  width: function (width) {
    if (arguments.length === 0) {
      return this.w;
    }

    this.w = width;
    return this;
  },

  height: function (height) {
    if (arguments.length === 0) {
      return this.h;
    }

    this.h = height;
    return this;
  }
});
