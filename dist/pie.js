(function (d3) {
  /*
    Data come in an array of objects of the following form:

    { label: <string>, value: <int/float> }
  */

  d3.chart('Pie', {
    initialize: function (options) {
      var legendAvailable = d3.chart('Legend') !== null,
        legendGroup,
        pieGroup,
        labelGroup,
        tickGroup,
        centerCircleGroup,
        whiteCircle,
        placeholder;

      // setup options
      options = options || {};
      options.labels = options.legend ? false : true;
      this.width(options.width || this.base.attr('width') || 450);
      this.height(options.height || this.base.attr('height') || 300);
      this.radius(options.radius || 100);
      if (options.donutHole) {
        this.innerRadius(options.donutHole.radius || 0);
      }
      this.labelTemplate(options.labelTemplate || '{label}');
      this.labelOffset(options.labelOffset || 14);


      // setup tools for later
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

      // Groups
      pieGroup = this.base.append('svg:g')
        .attr('class', 'arc')
        .attr('transform', legendTranslate);
      this.pieGroup = pieGroup;

      // placeholder pie for loading..
      placeholder = pieGroup.append('svg:circle')
          .attr('fill', '#EFEFEF')
          .attr('r', this.r);

      // center circle group
      centerCircleGroup = this.base.append('svg:g')
        .attr('class', 'center-group')
        .attr('transform', legendTranslate);

      // center circle - makes donut
      if (options.donutHole && options.donutHole.radius) {
        whiteCircle = centerCircleGroup.append('svg:circle')
          .attr('fill', options.donutHole.color)
          .attr('r', this.ir);
      }

      labelGroup = this.base.append('svg:g')
        .attr('class', 'label-group')
          .attr('transform', translate(this.w / 2, this.h / 2));

      tickGroup = this.base.append('svg:g')
        .attr('class', 'label-group')
          .attr('transform', translate(this.w / 2, this.h / 2));

      // setup legend - if exists
      if (options.legend && legendAvailable) {
        legendChart = this.base.append('g')
          .attr('class', 'legend')
          .chart('Legend', options.legend);

        this.legend = this.attach('legend', legendChart);
        this.legend.base.attr('transform', function () { 
          return translate((options.radius * 2) + (options.radius / 2), options.radius / 3);
        });
      }

      function rotateMiddle (d) {
        return 'rotate(' + (d.startAngle + d.endAngle) / 2 * (180 / Math.PI) + ')';
      }

      function legendTranslate (d) {
        return options.legend && legendAvailable ? translate(options.radius) : translate(options.width / 2, options.height / 2);
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
              .attr('d', chart.arc)
              .on('mouseover', function (d) {
                d3.select(this)
                  .attr('opacity', 0.8);
              })
              .on('mouseout', function (d) {
                d3.select(this)
                  .attr('opacity', 1);
              });
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

      if (options.labels !== false) {
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
                template = chart.t,
                labelOffset = chart.loffset,
                r = chart.r;

              return this.attr('class', 'value')
                .attr('transform', function (d) {
                  return translate(Math.cos(((d.startAngle + d.endAngle - Math.PI) / 2)) *
                    (r + labelOffset), Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) *
                    (r + labelOffset));
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
                  return supplant(template, d);
                });
            },

            merge: function () {
              var chart = this.chart(),
                template = chart.t,
                labelOffset = chart.loffset,
                r = chart.r;

              return this.attr('class', 'value')
                .attr('transform', function (d) {
                  return translate(Math.cos(((d.startAngle + d.endAngle - Math.PI) / 2)) *
                    (r + labelOffset),
                    Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) *
                    (r + labelOffset));
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
                  return supplant(template, d.data);
                });
            },

            exit: function () {
              return this.remove();
            }
          }
        });
      }
    },

    transform: function (data) {
      return this.donut(data);
    },

    demux: function (name, data) {
      var results = [],
        item;

      if (name === 'legend') {
        for (item in data) {
          if (!data.hasOwnProperty(item)) {
            continue;
          }

          item = data[item];

          if (item && item.data) {
            results.push(item.data.label);    
          }
        }

        return results;
      }
      else {
        return data;
      }
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
    },

    labelTemplate: function (template) {
      if (arguments.length === 0) {
        return this.t;
      }

      this.t = template;
      return this;
    }
  });

  // Replace `{propName}` with objects properties in a string.
  function supplant (str, obj) {
    return str.replace(/{([^{}]*)}/g,
      function (a, b) {
        var value = obj[b];
        return typeof value === 'string' || typeof value === 'number' ? value : a;
      }
    );
  }

  function translate (x, y) {
    if (arguments && arguments.length === 1) {
      y = x;
    }

    return 'translate(' + x + ',' + y + ')';
  }
}(d3 || window.d3));
