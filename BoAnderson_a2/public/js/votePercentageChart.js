/**
 * Constructor for the Vote Percentage Chart
 */
function VotePercentageChart(){

    var self = this;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
VotePercentageChart.prototype.init = function(){
    var self = this;
    self.margin = {top: 30, right: 20, bottom: 30, left: 50};
    var divvotesPercentage = d3.select("#votes-percentage").classed("content", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = divvotesPercentage.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 200;

    //creates svg element within the div
    self.svg = divvotesPercentage.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",self.svgHeight)
        .attr("id", "v_percent_svg");
};

/**
 * Returns the class that needs to be assigned to an element.
 *
 * @param party an ID for the party that is being referred to.
 */
VotePercentageChart.prototype.chooseClass = function (party) {
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
 * Renders the HTML content for tool tip
 *
 * @param tooltip_data information that needs to be populated in the tool tip
 * @return text HTML content for toop tip
 */
VotePercentageChart.prototype.tooltip_render = function (tooltip_data) {
    var self = this;
    var text = "<ul>";
    tooltip_data.result.forEach(function(row){
        text += "<li class = " + self.chooseClass(row.party)+ ">" + row.nominee+":\t\t"+row.votecount+"("+row.percentage+"%)" + "</li>"
    });

    return text;
}

/**
 * Creates the stacked bar chart, text content and tool tips for Vote Percentage chart
 *
 * @param electionResult election data for the year selected
 */
VotePercentageChart.prototype.update = function(electionResult) {
    var self = this;

    //for reference:https://github.com/Caged/d3-tip
    //Use this tool tip element to handle any hover over the chart
    // tip = d3.tip().attr('class', 'd3-tip')
    //     .direction('s')
    //     .offset(function() {
    //         return [0,0];
    //     })
    //     .html(function(d) {
    //         /* populate data in the following format
    //          * tooltip_data = {
    //          * "result":[
    //          * {"nominee": D_Nominee_prop,"votecount": D_Votes_Total,"percentage": D_PopularPercentage,"party":"D"} ,
    //          * {"nominee": R_Nominee_prop,"votecount": R_Votes_Total,"percentage": R_PopularPercentage,"party":"R"} ,
    //          * {"nominee": I_Nominee_prop,"votecount": I_Votes_Total,"percentage": I_PopularPercentage,"party":"I"}
    //          * ]
    //          * }
    //          * pass this as an argument to the tooltip_render function then,
    //          * return the HTML content returned from that method.
    //          * */
    //         return ;
    //     });


    // ******* TODO: PART III *******

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
    var reps_percent = 0;
    var dems_percent = 0;
    var indys_percent = 0;
    var total = 0;

    //SORT BY POLITICAL PARTY
    electionResult.forEach(results => {
        reps_percent = reps_percent + results.R_Votes;
        dems_percent = dems_percent + results.D_Votes;
        indys_percent = indys_percent + results.I_Votes;
        total++;
    });

    var total_votes = reps_percent + dems_percent + indys_percent;
    reps_percent = reps_percent / total_votes;
    dems_percent = dems_percent / total_votes;
    indys_percent = indys_percent / total_votes;

    console.log("R: " + reps_percent + "D: " + dems_percent + "I: " + indys_percent);

    var percents = [];
    percents[0] = indys_percent;
    percents[1] = dems_percent;
    percents[2] = reps_percent;

    //Create the stacked bar chart.
    //Use the global color scale to color code the rectangles.
    //HINT: Use .electoralVotes class to style your bars.
    var svg = d3.select("#votes-percentage").select("#v_percent_svg");

    var rects = svg.selectAll("rect")
          .data(percents);

    var new_pos = 0;

      rects.enter().append("rect")
          .attr("fill", function(d, index) {
              if(index == 0) {
                return "#43A047";
              }
              else if(index  == 1) {
                return "#0066CC";
              }
              else {
                return "#CC0000";
              }
          })
          .attr("class", ".votePercentage")
          .attr("x", function(d) {
            var new_width = d * self.svgWidth;
            var return_val = new_pos;
            new_pos = new_pos + new_width;
            return return_val + 1;
          })
          .attr("y", 50)
          .attr("width", function(d) {
              if(d == 0) {
                  return 0;
              }
              return d * self.svgWidth - 1;
          })
          .attr("height", 50);

      // Exit
      rects.exit().remove();

    //APPENDING PERCENTAGE TEXT ELEMENTS
    //BEGIN CITATION #1
    svg.append("text")
        .attr("class", "independent")
        .attr("x", 0)
        .attr("y", 40)
        .text((indys_percent * 100).toFixed(2) + "%")
        .attr("opacity", function(d) {
            if(indys_percent > 0) {
                return 1;
            }
            return 0;
        })
        .attr("font-size", 20);
    svg.append("text")
        .attr("class", "democrat")
         .attr("x", 70)
        .attr("y", 40)
        .text((dems_percent * 100).toFixed(2) + "%")
        .attr("font-size", 20);
    svg.append("text")
        .attr("class", "republican")
        .attr("x", self.svgWidth - 120)
        .attr("y", 40)
        .text((reps_percent * 100).toFixed(2) + "%")
        .attr("font-size", 20);

        //END CITATION #1

    //APPENDING NOMINEE TEXT ELEMENTS
        svg.append("text")
            .attr("class", "independent")
            .attr("x", 0)
            .attr("y", 20)
            .text(electionResult[0].I_Nominee)
            .attr("opacity", function(d) {
                if(indys_percent > 0) {
                    return 1;
                }
                return 0;
            })
            .attr("font-size", 10);
    svg.append("text")
        .attr("class", "democrat")
         .attr("x", function(d) {
            if(indys_percent > 0) {
                return 100;
            }
            else {
                return 0;
            }
        })
        .attr("y", 20)
        .text(electionResult[0].D_Nominee)
        .attr("font-size", 10);
    svg.append("text")
        .attr("class", "republican")
        .attr("x", self.svgWidth - 100) //????
        .attr("y", 20)
        .text(electionResult[0].R_Nominee)
        .attr("font-size", 10);


    //Create the stacked bar chart.
    //Use the global color scale to color code the rectangles.
    //HINT: Use .votesPercentage class to style your bars.

    //Display the total percentage of votes won by each party
    //on top of the corresponding groups of bars.
    //HINT: Use the .votesPercentageText class to style your text elements;  Use this in combination with
    // chooseClass to get a color based on the party wherever necessary

    //Display a bar with minimal width in the center of the bar chart to indicate the 50% mark
    //HINT: Use .middlePoint class to style this bar.

    //Just above this, display the text mentioning details about this mark on top of this bar
    //HINT: Use .votesPercentageNote class to style this text element

    //Call the tool tip on hover over the bars to display stateName, count of electoral votes.
    //then, vote percentage and number of votes won by each party.

    //HINT: Use the chooseClass method to style your elements based on party wherever necessary.

};
