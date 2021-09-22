/*globals alert, document, d3, console*/
// These keep JSHint quiet if you're using it (highly recommended!)

function staircase() {
    var i , j;
    const updatedOrder = [] ;
    var max_width = 0 ; //arbitrary small value 
    var previous_max = 500; //arbitrary large value
    // ****** TODO: PART II ******
    const bchart = document.getElementById("barcharts1");
    const numChildren = bchart.childElementCount;
    for(i = 0; i < numChildren; ++i) {
        max_width = 0;
        for(j = 0; j < numChildren; ++j) {
            var rect = bchart.children[j];
        //BEGIN CITATION #1
            var width = rect.width.baseVal.value ;
        //END CITATION #1
            if(width >= max_width && width < previous_max) {
                max_width = width ;
            }
        }

        updatedOrder[i] = max_width ;
        previous_max = max_width ;
    }
    
    j = 0; //will be the counter for first bar chart children
    for(i = 0; i < numChildren; ++i) {
        if(bchart.children[i].id == "first") {
            bchart.children[j].width.baseVal.value = updatedOrder[j];
            j++;
        }
    }
}

function clearGraphs() {
    var mybar1 = d3.select('#barcharts1')
        .selectAll("rect")
        .remove()
        .exit();
    var mybar2 = d3.select('#barcharts2')
        .selectAll("rect")
        .remove()
        .exit();
    var myline1 = d3.select('#linecharts1')
        .select("path")
        .remove()
        .exit();
        var myline2 = d3.select('#linecharts2')
        .select("path")
        .remove()
        .exit();
    var myarea1 = d3.select('#areacharts1')
        .select("path")
        .remove()
        .exit();
    var myarea2 = d3.select('#areacharts2')
        .select("path")
        .remove()
        .exit();
    var scat = d3.select('#scatter')
        .selectAll("circle")
        .remove()
        .selectAll("rect")
        .remove()
        .exit();
}

function randomSubset() {
    // Load the file indicated by the select menu,
    // and then slice out a random chunk before
    // passing the data to update()
    var dataFile = document.getElementById('dataset').value;
    if (document.getElementById('random').checked) {
        d3.csv('data/' + dataFile + '.csv').then(function(data) {
            var subset = [];
            data.forEach(function(d) {
                if (Math.random() > 0.5) {
                    subset.push(d);
                }
            });
            update(subset);
        });
    }
    else{
        changeData();
    }
}

function changeData() {
    // // Load the file indicated by the select menu

    var dataFile = document.getElementById('dataset').value;
    if (document.getElementById('random').checked) {
        randomSubset();
    }
    else{
        d3.csv('data/' + dataFile + '.csv').then(update);
    }
}


// function addBarEvents(data) {
//     var a ;
//     console.log("BEGIN ADD BAR EVENTS");
//     var bchart = document.getElementById("barcharts1");
//     const numChildren = bchart.childElementCount;
//     for(i = 0; i < numChildren; ++i) {
//         var rect = bchart.children[i];
//         rect.setAttribute("style", "fill:red");
//         //BEGIN CITATION #1
//         rect.setAttribute("onmouseover", function(d) {
//             rect.setAttribute("style", "fill:red");
//         });
//         //END CITATION #1
//     }
// }

function update(data) {
    // D3 loads all CSV data as strings;
    // while Javascript is pretty smart
    // about interpreting strings as
    // numbers when you do things like
    // multiplication, it will still
    // treat them as strings where it makes
    // sense (e.g. adding strings will
    // concatenate them, not add the values
    // together, or comparing strings
    // will do string comparison, not
    // numeric comparison).

    // We need to explicitly convert values
    // to numbers so that comparisons work
    // when we call d3.max()
    data.forEach(function (d) {
        d.a = parseInt(d.a);
        d.b = parseFloat(d.b);
    });


    // Set up the scales
    var aScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d.a;
        })])
        .range([0, 150]);
    var bScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d.b;
        })])
        .range([0, 150]);
    var iScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, 110]);

    // ****** TODO: PART III (you will also edit in PART V) ******
        clearGraphs();

        // TODO: Select and update the 'a' bar chart bars
        var translateY1 = 220; //starting y value for transformation
        var translateY2 = 220;
        var bchart1, bchart2;
        bchart1 = d3.select('#barcharts1');
        bchart2 = d3.select('#barcharts2');

        bchart1.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("id", "first")
        .attr("width", function(d) {
            return d.a * 25.0;
        })
        .attr("height", 19)
        .attr("transform", function(d) {
                translateY1 -= 20;
                return "translate(0," + translateY1 + ")";
        });


    // TODO: Select and update the 'b' bar chart bars
        bchart2.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("id", "second")
        .attr("width", function(d) {
            return d.b * 25.0;
        })
        .attr("height", 19)
        .attr("transform", function(d) {
                translateY2 -= 20;
                return "translate(300," + translateY2 + ")";
        });        

            
    var lchart1 = d3.select('#linecharts1');
    var lchart2 = d3.select('#linecharts2');

    // TODO: Select and update the 'a' line chart path using this line generator
    var aLineGenerator = d3.line()
        .x(function (d, i) {
            return iScale(i);
        })
        .y(function (d) {
            return aScale(d.a);
        });

    lchart1.append("path")
    .attr("fill", "none")
    .attr("stroke", "#0074d9")
    .attr("stroke-width", 3)
    .attr("transform", "scale(1 -1) translate(40 -200)")
    .attr("d", aLineGenerator(data));

    // TODO: Select and update the 'b' line chart path (create your own generator)

    var bLineGenerator = d3.line()
        .x(function (d, i) {
            return iScale(i);
        })
        .y(function (d) {
            return bScale(d.b);
        });
    
    lchart2.append("path")
    .attr("fill", "none")
    .attr("stroke", "#0074d9")
    .attr("stroke-width", 3)
    .attr("transform", "scale(1 -1) translate(40 -200)")
    .attr("d", bLineGenerator(data));


                
    var achart1 = d3.select('#areacharts1');
    var achart2 = d3.select('#areacharts2');
    // TODO: Select and update the 'a' area chart path using this line generator

    var aAreaGenerator = d3.area()
        .x(function (d, i) {
            return iScale(i);
        })
        .y0(0)
        .y1(function (d) {
            return aScale(d.a);
        });

    achart1.append("path")
        .attr("fill", "#0074d9")
        .attr("stroke", "#0074d9")
        .attr("stroke-width", 3)
        .attr("transform", "scale(1 -1) translate(40 -200)")
        .attr("d", aAreaGenerator(data));

    // TODO: Select and update the 'b' area chart path (create your own generator)

    var bAreaGenerator = d3.area()
    .x(function (d, i) {
        return iScale(i);
    })
    .y0(0)
    .y1(function (d) {
        return aScale(d.b);
    });

    achart2.append("path")
        .attr("fill", "#0074d9")
        .attr("stroke", "#0074d9")
        .attr("stroke-width", 3)
        .attr("transform", "scale(1 -1) translate(40 -200)")
        .attr("d", bAreaGenerator(data));


    var scatter = d3.select('#scatter');
    // TODO: Select and update the scatterplot points
    scatter.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return d.a * 7;
    })
    .attr("cy", function(d) {
        return d.b * 7;
    })
    .attr("r", 3)
    .attr("style", "fill:green");

    // ****** TODO: PART IV ******
    // addBarEvents(data);
};