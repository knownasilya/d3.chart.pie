/*
  Data come in an array of objects of the following form:

  { label: <string>, value: <int/float> } 
*/

d3.chart('Pie', {
  initialize: function (options) {
    var pieGroup,
      labelGroup,
      tickGroup,
      centerCircleGroup,
      whiteCircle,
      placeholder;

    options = options || {};
    // setup options
    this.width(options.width || this.base.attr('width') || 450);
    this.height(options.height || this.base.attr('height') || 300);
    this.radius(options.radius || 100);
    this.innerRadius(options.innerRadius || 0);
    this.labelOffset(options.labelOffset || 14);

    this.arc = d3.svg.arc()
      .startAngle(function (d) { 
        return d.startAngle; 
      })
      .endAngle(function (d) { 
        return d.endAngle; 
      })
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
    if (this.ir) {
      whiteCircle = centerCircleGroup.append('svg:circle')
        .attr('fill', 'white')
        .attr('r', this.ir);
    }

    labelGroup = this.base.append('svg:g')
      .attr('class', 'label-group')
        .attr('transform', 'translate(' + (this.w / 2) + ',' + (this.h / 2) + ')');

    tickGroup = this.base.append('svg:g')
      .attr('class', 'label-group')
        .attr('transform', 'translate(' + (this.w / 2) + ',' + (this.h / 2) + ')');

    function rotateMiddle(d) { 
      return 'rotate(' + (d.startAngle + d.endAngle) / 2 * (180 / Math.PI) + ')';
    }

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
        },

        merge: function () {
          var chart = this.chart();

          return this.attr('stroke', 'white')
            .attr('stroke-width', 0.5)
            .attr('fill', function (d, i) { 
                return chart.color(i); 
              })
            .attr('d', chart.arc); 
        },

        exit: function () {
          return this.remove();
        }
      }
    });

    this.layer('ticks', tickGroup, {
      dataBind: function (data) {
        return this.selectAll('line')
          .data(data);
      },

      insert: function () {
        return this.insert('svg:line');
      },

      events: {
        enter: function () {
          var chart = this.chart(),
            r = chart.r;

          return this.attr('x1', 0)
            .attr('x2', 0)
            .attr('y1', -r - 3)
            .attr('y2', -r - 8)
            .attr('stroke', 'gray')
            .attr('transform', rotateMiddle);
        },

        merge: function () {
          var chart = this.chart(),
            r = chart.r;

          return this.attr('x1', 0)
            .attr('x2', 0)
            .attr('y1', -r - 3)
            .attr('y2', -r - 8)
            .attr('stroke', 'gray')
            .attr('transform', rotateMiddle);
        },

        exit: function () {
          return this.remove();
        }
      }
    });

    this.layer('labels', labelGroup, {
      dataBind: function (data) {
        return this.selectAll('text.value')
          .data(data);
      },

      insert: function () {
        return this.insert('svg:text');
      },

      events: {
        enter: function () {
          var chart = this.chart(),
            labelOffset = chart.loffset,
            r = chart.r;

          return this.attr('class', 'value')
            .attr('transform', function (d) {
              return 'translate(' + Math.cos(((d.startAngle + d.endAngle - Math.PI) / 2)) * 
                (r + labelOffset) + ',' + 
                Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) * 
                (r + labelOffset) + ')';
            })
            .attr('dy', function (d) {
              var halfAngleSum = (d.startAngle + d.endAngle) / 2;

              if (halfAngleSum > Math.PI / 2 && halfAngleSum < Math.PI * 1.5) {
                return 5;
              } else {
                return -7;
              }
            })
            .attr('text-anchor', function (d) {
              if ((d.startAngle + d.endAngle) / 2 < Math.PI) {
                return 'beginning';
              } else {
                return 'end';
              }
            })
            .text(function (d) {
              return d.value + ' - ' + d.label;
            });
        },

        merge: function () {
          var chart = this.chart(),
            labelOffset = chart.loffset,
            r = chart.r;

          return this.attr('class', 'value')
            .attr('transform', function (d) {
              return 'translate(' + Math.cos(((d.startAngle + d.endAngle - Math.PI) / 2)) * 
                (r + labelOffset) + ',' + 
                Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) * 
                (r + labelOffset) + ')';
            })
            .attr('dy', function (d) {
              if ((d.startAngle + d.endAngle) / 2 > Math.PI / 2 && (d.startAngle + d.endAngle) / 2 < Math.PI * 1.5) {
                return 5;
              } else {
                return -7;
              }
            })
            .attr('text-anchor', function (d) {
              if ((d.startAngle + d.endAngle) / 2 < Math.PI) {
                return 'beginning';
              } else {
                return 'end';
              }
            })
            .text(function (d) {
              return d.value + ' - ' + d.data.label;
            });
        },

        exit: function () {
          return this.remove();
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
  },

  labelOffset: function (offset) {
    if (arguments.length === 0) {
      return this.loffset;
    }

    this.loffset = offset;
    return this;
  }
});
