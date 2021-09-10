
// Global variable with 60 attractions (JSON format)
// console.log(attractionData);

dataFiltering();

function dataFiltering() {
	var attractions = attractionData;

	/* **************************************************
	 *
	//sort JSON array descending order by visitors
	*/
	attractions.sort(function(a,b) {
		return b.Visitors - a.Visitors;
	});

	var filtered = attractions.filter(function(value, index) {
		return (index < 5);
	});

	attractions = filtered;
	/*
	 *
	 * CALL THE FOLLOWING FUNCTION TO RENDER THE BAR-CHART:
	 */
		
	renderBarChart(attractions);

	//console.log(attractions);

	/*
	 *
	 * - 'data' must be an array of JSON objects
	 * - the max. length of 'data' is 5
	 *
	 * **************************************************/

}