d3.chart('Pie', {
  initialize: function () {
    var pieGroup,
      centerCircleGroup,
      whiteCircle,
      placeholder;

    this.h = this.base.attr('height');
    this.w = this.base.attr('width');
    this.arc = d3.svg.arc()
      .startAngle(function (d) { return d.startAngle; })
      .endAngle(function (d) { return d.endAngle; })
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

    //PLACEHOLDER GRAY CIRCLE
    placeholder = pieGroup.append('svg:circle')
        .attr('fill', '#EFEFEF')
        .attr('r', this.r); 

    //GROUP FOR CENTER TEXT  
    centerCircleGroup = this.base.append('svg:g')
      .attr('class', 'center-group')
      .attr('transform', 'translate(' + 
        (this.w / 2) + ',' + (this.h / 2) + ')');

    whiteCircle = centerCircleGroup.append('svg:circle')
      .attr('fill', 'white')
      .attr('r', this.ir);


    this.layer('slices', pieGroup, {
      dataBind: function (data) {
        return this.selectAll('circle')
          .remove()
          .selectAll('path')
          .data(data);
      },

      insert: function () {
        var chart = this.chart();

        return this.append('svg:path')
          .attr('stroke', 'white')
          .attr('stroke-width', 0.5)
          .attr('fill', function (d, i) { 
              return chart.color(i); 
            })
          .attr('d', function (d) {
            return chart.arc(d);
          }); 
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
