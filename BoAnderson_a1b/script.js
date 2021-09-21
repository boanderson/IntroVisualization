/*globals alert, document, d3, console*/
// These keep JSHint quiet if you're using it (highly recommended!)

function staircase() {
    var i , j;
    const updatedOrder = [] ;
    var max_width = 0 ; //arbitrary small value 
    var previous_max = 500; //arbitrary large value
    // ****** TODO: PART II ******
    console.log("STAIRCASE PRESSED");
    const bchart = document.getElementById("barcharts");
    const numChildren = bchart.childElementCount;
    //console.log(numChildren);
    for(i = 0; i < numChildren; ++i) {
        if(bchart.children[i].id == "first") {
            max_width = 0;
            for(j = 0; j < numChildren; ++j) {

                //checks if on "first bar chart"
                if(bchart.children[j].id == "first") {
                    //console.log(bchart.children[j].children[0].width.baseVal.value);
                    var rect = bchart.children[j];
                //BEGIN CITATION #1
                    var width = rect.width.baseVal.value ;
                //END CITATION #1
                    if(width >= max_width && width < previous_max) {
                        max_width = width ;
                    }
                }
            }

            updatedOrder[i] = max_width ;
            previous_max = max_width ;
        }
    }

    //console.log(updatedOrder[0]);
    
    j = 0; //will be the counter for first bar chart children
    for(i = 0; i < numChildren; ++i) {
        if(bchart.children[i].id == "first") {
            //console.log(updatedOrder[j]);
            //console.log(bchart.children[j].children[0].width.baseVal.value);
            bchart.children[j].width.baseVal.value = updatedOrder[j];
            j++;
        }
    }
    
    

}

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
    var dataFile = document.getElementById('dataset').value;
    clearGraph("bar");
    updateData(dataFile);

    // TODO: Select and update the 'a' bar chart bars

    // TODO: Select and update the 'b' bar chart bars

    // TODO: Select and update the 'a' line chart path using this line generator
    var aLineGenerator = d3.line()
        .x(function (d, i) {
            return iScale(i);
        })
        .y(function (d) {
            return aScale(d.a);
        });

    // TODO: Select and update the 'b' line chart path (create your own generator)

    // TODO: Select and update the 'a' area chart path using this line generator
    var aAreaGenerator = d3.area()
        .x(function (d, i) {
            return iScale(i);
        })
        .y0(0)
        .y1(function (d) {
            return aScale(d.a);
        });

    // TODO: Select and update the 'b' area chart path (create your own generator)

    // TODO: Select and update the scatterplot points

    // ****** TODO: PART IV ******
}

function clearGraph(type) {
    if(type == "bar") {
        let mybar = d3.select('#barcharts')
            .selectAll("rect")
            .remove()
            .exit();
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
    console.log("CHANGE DATA");
}

function updateData(d) {
    console.log(d);
    var i = 0;
    var translateY1 = 220; //starting y value for transformation
    var translateY2 = 220;
    var translateX = 0; //starting x value for transformation
    d3.csv('data/' + d + '.csv')
    .then(data => {
        var bchart;
        console.log(data);
        var i = 0; //counter
        const children = 22;
        console.log("CHILDREN: " + children);
        bchart = d3.select('#barcharts');
        console.log(bchart.attr("width"));
        bchart.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", function(d) {
            return d.a * 25.0;
        })
        .attr("height", 19)
        .attr("transform", function(d) {
                translateY1 -= 20;
                return "translate(0," + translateY1 + ")";
        });

        bchart.selectAll("rect")
        .data(data)
        .enter()
        .merge(bchart)
        .append("rect")
        .attr("width", function(d) {
            return d.b * 25.0;
        })
        .attr("height", 19)
        .attr("transform", function(d) {
                translateY2 -= 20;
                return "translate(400," + translateY2 + ")";
        })
    })
};


function randomSubset() {
    // Load the file indicated by the select menu,
    // and then slice out a random chunk before
    // passing the data to update()
    var dataFile = document.getElementById('dataset').value;
    if (document.getElementById('random').checked) {
        d3.csv('data/' + dataFile + '.csv').then(function(data) {
            var subset = [];
            data.forEach(function (d) {
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
    console.log("RANDOM SUBSET");
}