
// SVG drawing area

var margin = {top: 40, right: 10, bottom: 60, left: 60};

var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Scales
var x = d3.scaleBand()
    .rangeRound([0, width])
	.paddingInner(0.1);



var y = d3.scaleLinear()
    .range([height, 0]);


var yAxis = d3.axisLeft()
    .scale(y)

var yAxisGroup = svg.append("g")
    .attr("class", "y-axis axis");


// Initialize data
loadData();

// Create a 'data' property under the window object
// to store the coffee chain data
Object.defineProperty(window, 'data', {
	// data getter
	get: function() { return _data; },
	// data setter
	set: function(value) {
		_data = value;
		// update the visualization each time the data property is set by using the equal sign (e.g. data = [])
		updateVisualization()
	}
});

function selected(value){

  loadData(value);

}


// Load CSV file
function loadData(value) {

	d3.csv("data/coffee-house-chains.csv").then(function(csv) {

		csv.forEach(function(d){
			d.revenue = +d.revenue;
			d.stores = +d.stores;
		});
    //console.log(value == "revenue");
		// Store csv data in global variable
		data = csv;

    data.sort(function(a, b) { return b.stores - a.stores; });


    x.domain(data.map(function(d) { return d.company; }));
    y.domain(data.map(function(d) { return d.revenue; }));



    //var bars = d3.select("#chart-area").selectAll("svg");
    // Data-join (circle now contains the update selection)

    var text = svg.selectAll("text")
    .data(data);

      // Enter (initialize the newly added elements)
      text.enter().append("text")
          .attr("class", "text")
          .attr("fill", "#00000a")
          .attr("y", 450)
          .attr("font-size", 16)
          .attr("x", function(d, index) {
            return (index * 110) + 50;
           })
           .attr("font-size", 16)
          .text( function(d) {
            	console.log(d)
            	return d.company;
          });

      // Update (set the dynamic properties of the elements)

      text.style("opacity", 0.5)
          .transition()
          .duration(500)
          .style("opacity", 1) 
          .attr("class", "text")
          .attr("fill", "#00000a")
          .attr("y", 450)
          .attr("font-size", 16)
          .attr("x", function(d, index) {
            return (index * 110) + 50;
           })
          .text(function(d) {
            	//console.log(d)
            	return d.company;
          });

      // Exit
      text.exit().remove();

      var bars = svg.selectAll("rect")
          .data(data);


      //console.log(value)
      y.domain([0, d3.max(data, function(d) { return d.stores  })]);
        svg.select(".y-axis")
            .call(yAxis);

      bars.enter().append("rect")
          .attr("class", "bar")
          .attr("fill", "#707086")
          .attr("y", -430)
          .attr("x", function(d, index) { return (index * 110) + 50 })
          .attr("height", function(d, i) {
                return d.stores/50;
          })
          .attr("width", 100)
          .attr("transform", "scale(1,-1)");



          //here we update on switch if the value indicates a switch.
      if(value !=null){
        if(value == "revenue"){
            y.domain([0, d3.max(data, function(d) { return d.revenue })]);
            svg.select(".y-axis")
                .call(yAxis);
        }
        if(value == "stores"){
          y.domain([0, d3.max(data, function(d) { return d.stores  })]);
            svg.select(".y-axis")
                .call(yAxis);
        }

        bars.attr("height", function(d, i) {
          //console.log(value);
          if(value == "revenue"){

              return d.revenue * 20
          }
          if(value == "stores"){
            //console.log(d);
            return d.stores/50;
          }

        })
    }

    bars.style("opacity", 0.5)
          .transition()
          .duration(500)
          .style("opacity", 1) 
          .attr("class", "bar")
          .attr("fill", "#707086")
          .attr("y", -430)
          .attr("x", function(d, index) { return (index * 110) + 50 })
          .attr("height", function(d, i) {
            if(value == "revenue"){
  
                return d.revenue * 20
            }
            if(value == "stores"){
              return d.stores/50;
            }
  
          })
          .attr("width", 100)
          .attr("transform", "scale(1,-1)");


      // Exit
      bars.exit().remove();

		// updateVisualization gets automatically called within the data = csv call;
		// basically(whenever the data is set to a value using = operator);
		// see the definition above: Object.defineProperty(window, 'data', { ...

	});

}




// Render visualization
function updateVisualization() {

  //console.log(data);

}
