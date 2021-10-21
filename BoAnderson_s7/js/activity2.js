var width = 1000, 
    height = 600;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);

var projection = d3.geoMercator()
    .center([10, -10.06])
    .scale(90)
    .translate([width / 2, height / 2]);

// var projection = d3.geoOrthographic()
//     .center([10, -10.06])
//     .scale(90)
//     .translate([width / 2, height / 2]);

// var projection = d3.geoAzimuthalEquidistant()
//     .center([10, -10.06])
//     .scale(90)
//     .translate([width / 2, height / 2]);

var path = d3.geoPath()
    .projection(projection);


var files = ["data/world-110m.json", "data/airports.json"];
var promises = [];

files.forEach(function(url) {
    promises.push(d3.json(url))
});

Promise.all(promises).then(function(values) {
    console.log("Stuff is loaded, ready to draw")
    console.log(values)

    map_data = values[0]
    airport_data = values[1]

    var simulation = d3.forceSimulation( airport_data.nodes )
        .force('link', d3.forceLink(airport_data.links).distance(100).strength(0.25).iterations(10));

    // Convert TopoJSON to GeoJSON (target object = 'states')
    var map = topojson.feature(map_data, map_data.objects.countries).features

    // Render the U.S. by using the path generator
    svg.selectAll("path")
            .data(map)
        .enter().append("path")
            .attr("d", path);

    // Draw links
    var link = svg.selectAll(".link")
        .data(airport_data.links)
        .enter()
        .append("line")
        .attr("class", "link")
        .style("stroke", "green");

    // Draw circles 
    var nodes = svg.selectAll(".circle")
        .data(airport_data.nodes)
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
        .attr("transform", function(d) {
            console.log(projection([d.longitude, d.latitude]))
            console.log(projection([d.longitude, d.latitude])[0])
            return "translate(" + projection([d.longitude, d.latitude]) + ")";
        })

    simulation.on("tick", function() {

        // Update edge coordinates
        link
            .attr("x1", d => projection([d.source.longitude, d.source.latitude])[0])
            .attr("y1", d => projection([d.source.longitude, d.source.latitude])[1])
            .attr("x2", d => projection([d.target.longitude, d.target.latitude])[0])
            .attr("y2", d => projection([d.target.longitude, d.target.latitude])[1])
        });



});



// // Load shapes of U.S. counties (TopoJSON)
// d3.json("data/world-110m.json")
//    .then(function(data) {
//        console.log(data)

//     // Convert TopoJSON to GeoJSON (target object = 'states')
//     var usa = topojson.feature(data, data.objects.countries).features
    
//     // Render the U.S. by using the path generator
//     svg.selectAll("path")
//             .data(usa)
//         .enter().append("path")
//             .attr("d", path);
// });