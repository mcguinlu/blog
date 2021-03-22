  var width   = $("p").width() ,
      height  = 200;
  
  var radius = 20;
  
  var topology = hexTopology(radius, width, height);
  
  var projection = hexProjection(radius);
  
  var path = d3.geo.path()
  .projection(projection);
  
  
  var svg = d3.select("#header_viz").append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("background-color","white")

  svg.append("text")
  .attr("x", width/2)
  .attr("y", height/2)
  .attr("class", "banner-text")
  .attr('text-anchor', "middle")
  .attr("alignment-baseline","central")
  .text("Hexations")
  .style('fill', '#4a4a4a')
  
  
  
   var svg2 = d3.select("#header_viz2").append("svg")
  .attr("width", width)
  .attr("height", height)

  svg2.append("text")
  .attr("x", width/2)
  .attr("y", height/2)
  .attr("class", "banner-text")
  .attr('text-anchor', "middle")
  .attr("alignment-baseline","central")
  .text("Hexations")
  .style('fill', '#4a4a4a')
  
  svg2.append("g")
  .attr("class", "hexagon")
  .selectAll("path")
  .data(topology.objects.hexagons.geometries)
  .enter().append("path")
  .attr("d", function(d) { return path(topojson.feature(topology, d)); })
  .attr("class", function(d) { return d.fill ? "nofill" : "fill"; })


   var svg3 = d3.select("#header_viz3").append("svg")
  .attr("width", width)
  .attr("height", height)

  svg3.append("text")
  .attr("x", width/2)
  .attr("y", height/2)
  .attr("class", "banner-text")
  .attr('text-anchor', "middle")
  .attr("alignment-baseline","central")
  .text("Hexations")
  .style('fill', '#4a4a4a')
  
  svg3.append("g")
  .attr("class", "hexagon")
  .selectAll("path")
  .data(topology.objects.hexagons.geometries)
  .enter().append("path")
  .attr("d", function(d) { return path(topojson.feature(topology, d)); })
  .attr("class", function(d) { return d.fill ? "nofill" : "fill"; })
  

   var svg4 = d3.select("#header_viz4").append("svg")
  .attr("width", width)
  .attr("height", height)

  svg4.append("text")
  .attr("x", width/2)
  .attr("y", height/2)
  .attr("class", "banner-text")
  .attr('text-anchor', "middle")
  .attr("alignment-baseline","central")
  .text("Hexations")
  .style('fill', '#4a4a4a')
  
  svg4.append("g")
  .attr("class", "hexagon")
  .selectAll("path")
  .data(topology.objects.hexagons.geometries)
  .enter().append("path")
.attr("d", function(d) {
  return path(topojson.feature(topology, d))
  
})
.attr("class", function(d) {
  return d.fill ? "nofill":"fill"
  
})
  .on("mousedown", mousedown)
  .on("mousemove", mousemove)
  .on("mouseup", mouseup)


  var mousing = 0;
  
  function mousedown(d) {
    mousing = d.fill ? -1 : +1;
    mousemove.apply(this, arguments);
  }
  
  function mousemove(d) {
    if (mousing) {
      d3.select(this)
        .attr("class", "fill")
        .classed("nofill", d.fill = mousing > 0);
    }
  }
  
  function mouseup() {
    mousemove.apply(this, arguments);
    mousing = 0;
  }
  

  function hexTopology(radius, width, height) {
    var dx = radius * 2 * Math.sin(Math.PI / 3),
    dy = radius * 1.5,
    m = Math.ceil((height + radius) / dy) + 1,
    n = Math.ceil(width / dx) + 1,
    geometries = [],
    arcs = [];
    
    for (var j = -1; j <= m; ++j) {
      for (var i = -1; i <= n; ++i) {
        var y = j * 2, x = (i + (j & 1) / 2) * 2;
        arcs.push([[x, y - 1], [1, 1]], [[x + 1, y], [0, 1]], [[x + 1, y + 1], [-1, 1]]);
      }
    }
    
    for (var j = 0, q = 3; j < m; ++j, q += 6) {
      for (var i = 0; i < n; ++i, q += 3) {
        geometries.push({
          type: "Polygon",
          arcs: [[q, q + 1, q + 2, ~(q + (n + 2 - (j & 1)) * 3), ~(q - 2), ~(q - (n + 2 + (j & 1)) * 3 + 2)]],
          fill: Math.random() < i / n * 4
        });
      }
    }
    
    return {
      transform: {translate: [0, 0], scale: [1, 1]},
      objects: {hexagons: {type: "GeometryCollection", geometries: geometries}},
      arcs: arcs
    };
  }
  
  function hexProjection(radius) {
    var dx = radius * 2 * Math.sin(Math.PI / 3),
    dy = radius * 1.5;
    return {
      stream: function(stream) {
        return {
          point: function(x, y) { stream.point(x * dx / 2, (y - (2 - (y & 1)) / 3) * dy / 2); },
          lineStart: function() { stream.lineStart(); },
          lineEnd: function() { stream.lineEnd(); },
          polygonStart: function() { stream.polygonStart(); },
          polygonEnd: function() { stream.polygonEnd(); }
        };
      }
    };
  }