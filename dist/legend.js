(function (d3) {

  d3.chart('Legend', {
    initialize: function (options) { 
      var markersGroup,
        labelsGroup;

      options = options || {};
      this.markerRadius(options.markerRadius || 5); 
      this.colors(options.colors || d3.scale.category20());
      this.x = options.x;
      this.y = options.y;

      this.base.attr('transform', 'translate(' + this.x + ',' +
        this.y + ')');

      // Groups
      markersGroup = this.base.append('g')
        .attr('class', 'markers-group');
      labelsGroup = this.base.append('g')
        .attr('class', 'labels-group');

      // Layers
      this.layer('markers', markersGroup, {
        dataBind: function (data) {
          return this.selectAll('circle')
            .data(data);
        },

        insert: function () {
          return this.insert('svg:circle');
        },

        events: {
          enter: function () {
            var chart = this.chart();

            return this.attr('class', 'marker')
              .attr('fill', function (d, i) {
                return chart.color(i);
              })
              .attr('cx', 10)
              .attr('cy', function (d, i) {
                return (i * 20) + 10;
              })
              .attr('r', chart.markerR);
          }
        }
      });

      this.layer('labels', labelsGroup, {
        dataBind: function (data) {
          return this.selectAll('text')
            .data(data);
        },

        insert: function () {
          return this.insert('svg:text');
        },
        
        events: {
          enter: function () {
            var chart = this.chart();

            return this.attr('x', 20)
              .attr('y', function (d, i) {
                return (i * 20) + 9 + chart.markerR;
              })
              .text(function (d) {
                return d.label || d.data.label;
              });
          }
        }
      });
    },

    markerRadius: function (radius) {
      if (arguments.length === 0) {
        return this.markerR;
      }

      this.markerR = radius;
      return this;
    },

    colors: function (colors) {
      if (arguments.length === 0) {
        return this.color;
      }
      
      if (typeof colors === 'function') {
        this.color = colors;
      }
      else if (Array.isArray(colors)) {
        this.color = function (i) {
          return colors[i] || '#333333';
        };
      }

      return this;
    }
  });
}(d3));
