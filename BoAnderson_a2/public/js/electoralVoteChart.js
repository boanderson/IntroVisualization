
/**
 * Constructor for the ElectoralVoteChart
 *
 * @param brushSelection an instance of the BrushSelection class
 */
function ElectoralVoteChart(){

    var self = this;
    self.init();
};

var total_EV = 538;

/**
 * Initializes the svg elements required for this chart
 */
ElectoralVoteChart.prototype.init = function(){
    var self = this;
    self.margin = {top: 30, right: 20, bottom: 30, left: 50};

    //Gets access to the div element created for this chart from HTML
    var divelectoralVotes = d3.select("#electoral-vote").classed("content", true);
    self.svgBounds = divelectoralVotes.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 150;

    //creates svg element within the div
    self.svg = divelectoralVotes.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",self.svgHeight)
        .attr("id", "e_vote_svg");
};

/**
 * Returns the class that needs to be assigned to an element.
 *
 * @param party an ID for the party that is being referred to.
 */
ElectoralVoteChart.prototype.chooseClass = function (party) {
    var self = this;
    if (party == "R"){
        return "republican";
    }
    else if (party == "D"){
        return "democrat";
    }
    else if (party == "I"){
        return "independent";
    }
}

/**
 * Creates the stacked bar chart, text content and tool tips for electoral vote chart
 *
 * @param electionResult election data for the year selected
 * @param colorScale global quantile scale based on the winning margin between republicans and democrats
 */

ElectoralVoteChart.prototype.update = function(electionResult, colorScale){
    var self = this;

    electionResult.forEach(result => {
        result.D_Votes = +result.D_Votes;
        result.R_Votes = +result.R_Votes;
        result.I_Votes = +result.I_Votes;
        result.Total_EV = +result.Total_EV;
        result.D_Percentage = +result.D_Percentage;
        result.D_Votes = +result.D_Votes;
        result.R_Percentage = +result.R_Percentage;
        result.R_Votes = +result.R_Votes;
        result.I_Percentage = +result.I_Percentage;
        result.I_Votes = +result.I_Votes;
    })

    // ******* TODO: PART II *******

    //Group the states based on the winning party for the state;
    //then sort them based on the margin of victory
    var reps = [];
    var dems = [];
    var indys = [];
    var d = 0;
    var i = 0;
    var r = 0;


    //SORT BY POLITICAL PARTY
    electionResult.forEach(results => {
        if(results.D_Votes > results.R_Votes) {
            if(results.D_Votes > results.I_Votes) {
                dems[d] = results;
                d++;
            }
            else {
                indys[i] = results;
                i++;
            }
        }
        else {
            reps[r] = results;
            r++;
        }
        //console.log("D: " + d + " R: " + r + " I: " + i);
    });
    var index = 0;
    var limit_margin = 1000; //arbitrary number

    //SORT DEMS BY MARGIN highest to lowest
    dems.sort(function(x, y) {
        return Math.min(y.D_Votes - y.R_Votes, y.D_Votes - y.I_Votes) - Math.min(x.D_Votes - x.R_Votes, x.D_Votes - x.I_Votes);
    });

    //SORT REPS BY MARGIN lowest to highest
    reps.sort(function(x, y) {
        return Math.min(x.R_Votes - x.D_Votes, x.R_Votes - x.I_Votes) - Math.min(y.R_Votes - y.D_Votes, y.R_Votes - y.I_Votes);
    });

    //merge all arrays in order we want
    var all_parties = indys.concat(dems, reps);


    //Create the stacked bar chart.
    //Use the global color scale to color code the rectangles.
    //HINT: Use .electoralVotes class to style your bars.
    var svg = d3.select("#electoral-vote").select("#e_vote_svg");

    var rects = svg.selectAll("rect")
          .data(all_parties);

    var new_pos = 0;

    //Color range for global color scale
    //var range = ["#0066CC", "#0080FF", "#3399FF", "#66B2FF", "#99ccff", "#CCE5FF", "#ffcccc", "#ff9999", "#ff6666", "#ff3333", "#FF0000", "#CC0000"];
      rects.enter().append("rect")
          .attr("fill", function(d, index) {
              if(index < indys.length) {
                return "#43A047";
              }
              else if(index < indys.length + dems.length) {
                if(index < indys.length + (dems.length / 6.0)) {
                    return "#0066CC";
                }
                else if(index < indys.length + (dems.length / 3.0)) {
                    return "#0080FF";
                }
                else if(index < indys.length + (dems.length / 2.0)) {
                    return "#3399FF";
                }
                else if(index < indys.length + (2.0 * dems.length / 3.0)) {
                    return "#66B2FF";
                }
                else if(index < indys.length + (5.0 * dems.length / 6.0)) {
                    return "#99ccff";
                }
                else {
                    return "#CCE5FF";
                }
              }
              else {
                if(index < indys.length + dems.length + (reps.length / 6.0)) {
                    return "#ffcccc";
                }
                else if(index < indys.length+ dems.length + (reps.length / 3.0)) {
                    return "#ff9999";
                }
                else if(index < indys.length + dems.lenght + (reps.length / 2.0)) {
                    return "#ff6666";
                }
                else if(index < indys.length + dems.length + (2.0 * reps.length / 3.0)) {
                    return "#ff3333";
                }
                else if(index < indys.length + dems.length + (5.0 * reps.length / 6.0)) {
                    return "#FF0000";
                }
                else {
                    return "#CC0000";
                }
              }
          })
          .attr("class", ".electoralVotes")
          .attr("x", function(d, index) {
            var new_width = (d.Total_EV / total_EV) * self.svgWidth;
            var return_val = new_pos;
            new_pos = new_pos + new_width;
            return return_val + 2;
        })
          .attr("y", 50)
          .attr("width", function(d) {
              return (d.Total_EV / total_EV) * self.svgWidth - 1;
          })
          .attr("height", 50);

      // Exit
      rects.exit().remove();

      //USED FOR DISPLAYING TOTAL EV ABOVE CHART
      var i;
      var totalDems = 0;
      dems.forEach(d => {
        console.log(d);
        totalDems = totalDems + d.Total_EV;
      });
      var totalReps = 0;
      reps.forEach(d => {
        console.log(d);
        totalReps = totalReps + d.Total_EV;
      });
      var totalIndys = 0;
      indys.forEach(d => {
        console.log(d);
        totalIndys = totalIndys + d.Total_EV;
      });

    console.log("I: " + totalIndys + "D: " + totalDems + "R: " + totalReps);

    var indy, dem, rep;

    if(indys.length > 0) {
        indy = svg.append("text")
            .attr("class", "independent")
            .attr("x", 0)
            .attr("y", 30)
            .text(totalIndys)
            .attr("font-size", 20);
    }
    dem = svg.append("text")
        .attr("class", "democrat")
         .attr("x", 60)
        .attr("y", 30)
        .text(totalDems)
        .attr("font-size", 20);
    rep = svg.append("text")
        .attr("class", "republican")
        .attr("x", self.svgWidth - 80) //????
        .attr("y", 30)
        .text(totalReps)
        .attr("font-size", 20);


    //Display total count of electoral votes won by the Democrat and Republican party
    //on top of the corresponding groups of bars.
    //HINT: Use the .electoralVoteText class to style your text elements;  Use this in combination with
    // chooseClass to get a color based on the party wherever necessary

    //Display a bar with minimal width in the center of the bar chart to indicate the 50% mark
    //HINT: Use .middlePoint class to style this bar.

    //Just above this, display the text mentioning the total number of electoral votes required
    // to win the elections throughout the country
    //HINT: Use .electoralVotesNote class to style this text element

    //HINT: Use the chooseClass method to style your elements based on party wherever necessary.

    //******* TODO: PART V *******
    //Implement brush on the bar chart created above.
    //Implement a call back method to handle the brush end event.
    //Call the update method of brushSelection and pass the data corresponding to brush selection.
    //HINT: Use the .brush class to style the brush.

};
