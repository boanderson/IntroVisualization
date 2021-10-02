
// The function is called every time when an order comes in or an order gets processed
// The current order queue is stored in the variable 'orders'

//Marissa Kalkar and Bo Anderson worked on this studio together
var svg = d3.select("#chart-area").append("svg")
      .attr("width", 600)
      .attr("height", 200);

var numOrder = 0;

var text = svg.append("text")
	.attr("x", 20)
	.attr("y", 50)


function updateVisualization(orders) {
	  text.text("orders: " + orders.length);
    var circle = svg.selectAll("circle")
        .data(orders);

    // Enter (initialize the newly added elements)
    circle.enter().append("circle")
        .attr("class", "dot")

    // Update (set the dynamic properties of the elements)
    circle
				.attr("fill", function(d) {

					if(d.product == "tea"){
						return "brown";
					}
					else{
						return "black";
					}
				})
        .attr("r", function(d) {
					return 20;
				})
        .attr("cx", function(d, index) { return (index * 80) + 50 })
        .attr("cy", 80);

    // Exit
    circle.exit().remove();
}
