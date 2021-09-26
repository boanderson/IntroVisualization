
// SVG Size
var width = 700;
var height = 500;



// Load CSV file
d3.csv('data/wealth-health-2014.csv').then(function(data) {
let padding = 20;
// Creating a scale function
let incomeScale = d3.scaleLinear()
	.domain([d3.min(data, function(d) {
			return d.Income;
		}), 
		d3.max(data, function(d) {
			return d.Income;
		})
	])
	.range([padding, width - padding]);

// Call the function and pass an input value
console.log("INCOME SCALE: " + incomeScale(5000));

// Creating a scale function
let lifeExpectancyScale = d3.scaleLinear()
    .domain([d3.min(data, function(d) {
			return d.LifeExpectancy;
	  	}), 
	  	d3.max(data, function(d) {
			return d.LifeExpectancy;
  		})
	])
    .range([height - padding, padding]); 

// Call the function and pass an input value
console.log("LIFE EXPECTANCY SCALE: " + lifeExpectancyScale(68));


	// Analyze the dataset in the web console
	//ACTIVITY 1 PART 2
	var i ;
	for(i = 0; i < data.length; i++) {
		var country = data[i] ;
		//console.log(country);
		country.LifeExpectancy = +country.LifeExpectancy;
		country.Income = +country.Income;
		country.Population = +country.Population;
	}
	//console.log(data);
	console.log("Countries: " + data.length);

	//ACTIVITY 1 PART 3
	var svg = d3.select("#chart-area")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

	  var circles = svg.selectAll("circle")
      .data(data)

   circles
      .enter()
      .append("circle")
      .merge(circles)
      .attr("cx", function(d){ return incomeScale(d.Income); })
     .attr("cy", function(d){ return lifeExpectancyScale(d.LifeExpectancy); })
      .attr("r", 4);
});
