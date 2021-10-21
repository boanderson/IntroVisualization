/**
 * Constructor for the Year Chart
 *
 * @param electoralVoteChart instance of ElectoralVoteChart
 * @param tileChart instance of TileChart
 * @param votePercentageChart instance of Vote Percentage Chart
 * @param electionInfo instance of ElectionInfo
 * @param electionWinners data corresponding to the winning parties over mutiple election years
 */
function YearChart(electoralVoteChart, tileChart, votePercentageChart, electionWinners) {
    var self = this;

    self.electoralVoteChart = electoralVoteChart;
    self.tileChart = tileChart;
    self.votePercentageChart = votePercentageChart;
    self.electionWinners = electionWinners;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
YearChart.prototype.init = function(){

    var self = this;
    self.margin = {top: 10, right: 20, bottom: 30, left: 50};
    var divyearChart = d3.select("#year-chart").classed("fullView", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = divyearChart.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 100;

    //creates svg element within the div
    self.svg = divyearChart.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",self.svgHeight)

};

/**
 * Returns the class that needs to be assigned to an element.
 *
 * @param party an ID for the party that is being referred to.
 */
YearChart.prototype.chooseClass = function (party) {
    var self = this;
    if (party == "R") {
        return "yearChart republican";
    }
    else if (party == "D") {
        return "yearChart democrat";
    }
    else if (party == "I") {
        return "yearChart independent";
    }
};


/**
 * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
 */
YearChart.prototype.update = function() {
    var self = this;
    var clicked = null;

    //Domain definition for global color scale
    var domain = [-60,-50,-40,-30,-20,-10,0,10,20,30,40,50,60];

    //Color range for global color scale
    var range = ["#0066CC", "#0080FF", "#3399FF", "#66B2FF", "#99ccff", "#CCE5FF", "#ffcccc", "#ff9999", "#ff6666", "#ff3333", "#FF0000", "#CC0000"];

    //Global colorScale to be used consistently by all the charts
    self.colorScale = d3.scaleQuantile()
        .domain(domain).range(range);
    
    self.electionWinners.forEach(function(d) {
        d.YEAR = +d.YEAR;
    });

    // ******* TODO: PART I *******

    // Create the chart by adding circle elements representing each election year
    //The circles should be colored based on the winning party for that year
    //HINT: Use the .yearChart class to style your circle elements
    //HINT: Use the chooseClass method to choose the color corresponding to the winning party.

    var svg = d3.select("#year-chart").select("svg");

    //<div id="year-chart" class="view">
    self.electionWinners.forEach(function(d){
		d.YEAR = +d.YEAR;
  });
  

  var i = 0;
  
  //PUTTING DASHES IN FOR AESTHETIC OF YEAR CHART
  for(i = 0; i < 43; i++) {
    svg.append("text")
    .attr("font-size", 10)
    .text(" - ")
    .attr("fill", "#00000a")
    .attr("x", function(d) {
      return (i * 20) + 24;
    })
    .attr("y", 53);
  }

    //console.log(value == "revenue");
		// Store csv data in global variable

    var circles = svg.selectAll("circle")
          .data(self.electionWinners);

      circles.enter().append("circle")
          .attr("fill", function(d) {
              if(d.PARTY == "D") {
                return "#0066CC";
              }
              else if(d.PARTY == "R") {
                return "#CC0000";
              }
              else {
                return "#43A047";
              }
          })
          .attr("cy", 50)
          .attr("cx", function(d, index) { 
              return (index * 25 ) + 30 ;
        })
          .attr("r", 5)
          .on("click", function(a, data) {
            d3.csv("data/election-results-" + data.YEAR + ".csv")
            .then(function(electionWinners) {
                //pass the instances of all the charts that update on selection change in YearChart
                self.electoralVoteChart.update(electionWinners, range);
                self.votePercentageChart.update(electionWinners);
          })});

      // Exit
      circles.exit().remove();

      var text = svg.selectAll("text")
        .data(self.electionWinners);

      // Enter (initialize the newly added elements)
      text.enter().append("text")
          .attr("class", "text")
          .attr("fill", "#00000a")
          .attr("y", 65)
          .attr("font-size", 16)
          .attr("x", function(d, index) {
            return (index * 25) + 24;
           })
           .attr("font-size", 5)
          .text( function(d) {
            	return d.YEAR;
          });

      // Exit
      text.exit().remove();

    //Append text information of each year right below the corresponding circle
    //HINT: Use .yeartext class to style your text elements

    //Style the chart by adding a dashed line that connects all these years.
    //HINT: Use .lineChart to style this dashed line

    //Clicking on any specific year should highlight that circle and  update the rest of the visualizations
    //HINT: Use .highlighted class to style the highlighted circle

    //Election information corresponding to that year should be loaded and passed to
    // the update methods of other visualizations


    //******* TODO: EXTRA CREDIT *******

    //Implement brush on the year chart created above.
    //Implement a call back method to handle the brush end event.
    //Call the update method of brushSelection and pass the data corresponding to brush selection.
    //HINT: Use the .brush class to style the brush.
};
