var rides = [
    {
        id: "1",
        name: "Space Mountain",
        price: 5,
        hours: ["Monday" , "Tuesday" , "Wednesday"],
        child_accessible: true
    },
    {
        id: "2",
        name: "The Zipper",
        price: 5,
        hours: ["Monday" , "Tuesday" , "Wednesday", "Thursday" , "Friday"],
        child_accessible: true
    },
    {
        id: "3",
        name: "Gravitron",
        price: 5,
        hours: ["Monday" , "Tuesday" , "Wednesday", "Thursday" , "Friday" , "Saturday"],
        child_accessible: true
    }
];

console.log("First ride: " + rides[0].name);

console.log("Days of week that second ride is open: ");
for(var i = 0; i < rides[1].hours.length; ++i) {
    console.log(rides[1].hours[i]);
}

console.log("First day in list of second ride's open days: ");
console.log(rides[1].hours[0]);

console.log("50% off third ride: ");
console.log("$" + rides[2].price / 2.0);
doublePrices(rides);
debugAmusementRides(rides);

function doublePrices(rides) {
    for(var i = 0; i < rides.length; ++i) {
        if(i != 1) { //excluding the second ride
            rides[i].price = rides[i].price * 2;
            console.log(rides[i].price);
        }
    }
}

function debugAmusementRides(rides) {
    for(var i = 0; i < rides.length; ++i) {
        console.log("Name: " + rides[i].name + ",     Price: $" + rides[i].price);
    }
}

function printAmusementRides() {
    for(var i = 0; i < rides.length; ++i) {
        var text = document.createElement("h2");
        text.innerHTML = "Name: " + rides[i].name + ", Price: $" + rides[i].price;
        var container = document.getElementById("container");
        container.appendChild(text);
    }
}

