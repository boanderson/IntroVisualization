
var width = 400, 
    height = 400;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);

// Load data
d3.json("data/airports.json").then(function(data) {
  console.log(data);
  console.log(data.nodes);

  // i) INITIALIZE FORCE-LAYOUT AND DEFINE 'NODES' AND 'EDGES'

  var simulation = d3.forceSimulation( data.nodes )
    .force('link', d3.forceLink(data.links).distance(100).strength(0.25).iterations(10));
  
  // ii) DRAW THE LINKS (SVG LINE)
  var link = svg.selectAll(".link")
        .data(data.links)
        .enter()
        .append("line")
        .attr("class", "link")
        .style("stroke", "grey");

  // iii) DRAW THE NODES (SVG CIRCLE)
  var nodes = svg.selectAll(".circle")
    .data(data.nodes)
    .enter()
    .append("circle")
    .style("stroke", "gray")
    .style("fill", function(d) {
      if(d.country == "United States") {
        return "blue"
      }
      else {
        return "red"
      }
    })
    .attr("r", 4)
    .on('mouseover', function (d, i) { // Referenced citation #8 to implement mouseover effect on points 
      d3.select(this).transition()
           .duration('100')
           .attr("r", 7);
    })
    .on('mouseout', function (d, i) {
          d3.select(this).transition()
              .duration('200')
              .attr("r", 4);
    });

  // iv) LISTEN TO THE 'TICK' EVENT AND UPDATE THE X/Y COORDINATES FOR ALL ELEMENTS
  simulation.on("tick", function() {

    let adjust = width * 0.5

    // Update node coordinates
    nodes
        .attr("cx", d => d.x + adjust)
        .attr("cy", d => d.y + adjust );

    // Update edge coordinates
    link
        .attr("x1", d => d.source.x + adjust)
        .attr("y1", d => d.source.y + adjust)
        .attr("x2", d => d.target.x + adjust)
        .attr("y2", d => d.target.y + adjust)
  });

  nodes.append("title")
  .text(function(d) { return d.name; });

  nodes.call(d3.drag()
    .on("start", dragstart)
    .on("drag", drag)
    .on("end", dragend));

  function dragstart(d) {
    if (!d.active) simulation.alphaTarget(0.3).restart();
    d.subject.fx = d.subject.x;
    d.subject.fy = d.subject.y;
  }

  function drag(d) {
    d.subject.fx = d.x;
    d.subject.fy = d.y;
  }

  function dragend(d) {
    if (!d.active) simulation.alphaTarget(0);
    d.subject.fx = null;
    d.subject.fy = null;
  }

});

