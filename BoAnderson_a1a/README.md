Assignment 1 | Bo Anderson | boanderson@wustl.edu | 463793

I used external resources.

Citations:
(author, year, title, the time accessed, URL)

1. Tutorials Teacher, 2020, "Create SVG Chart using D3", 9/12/2021 7:41PM, https://www.tutorialsteacher.com/d3js/create-svg-chart-in-d3js

I modeled my creation of the bar charts after the classes used in this example code found online:

    svg rect {
        fill: orange;
    }

    svg text {
        fill:white;
        font: 10px sans-serif;
        text-anchor: end;
    }

    <svg class="chart" width="420" height="120">
        <g transform="translate(0,0)">
            <rect width="50" height="19"></rect>
            <text x="47" y="9.5" dy=".35em">5</text>
        </g>
        <g transform="translate(0,20)">
            <rect width="100" height="19"></rect>
            <text x="97" y="9.5" dy=".35em">10</text>
        </g>
        <g transform="translate(0,40)">
            <rect width="120" height="19"></rect>
            <text x="117" y="9.5" dy=".35em">12</text>
        </g>
    </svg>


2. Robin Rendle, 2015, "How to Make Charts with SVG", 9/12/2021 9:22PM, https://css-tricks.com/how-to-make-charts-with-svg/

I modeled my creation of the line charts after the design of the following example line chart found on this webpage:

<svg viewBox="0 0 500 100" class="chart">
  <polyline
     fill="none"
     stroke="#0074d9"
     stroke-width="3"
     points="
       0,120
       20,60
       40,80
       60,20"/>
</svg>


3. Stack Overflow, 2020, "How to Flip SVG Horizontally?", 9/12/1018PM, https://stackoverflow.com/questions/60879413/how-to-flip-svg-horizontally

I modeled my attributes for the line chart after the following attribute found online in order to scale it to its desired mirror-image:

transform="scale(-1 1) translate(-36.1 0)"



