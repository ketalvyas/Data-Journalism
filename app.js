var svgWidth = 960;
var svgHeight = 500;
var margin = {top: 20,
     right: 40,
     bottom: 60,
     left: 100};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

  
var chartGroup = svg.append("g")
    .attr("transform",`translate(${margin.left},${margin.right})`);


// console.log(d3);

// d3.csv("Data.csv").then(function(data) {
  // console.log(data);
  // Visualize the data
  // visualize(data);
// });

d3.csv("Data.csv").then(function(data) {
  //     if(err) throw err;

    console.log(data);

    data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
    });
    
    var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(data, d => d.poverty)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([5, d3.max(data, d => d.obesity)])
    .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

     // Step 4: Append Axes to the chart
  // ==============================
  chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

chartGroup.append("g")
  .call(leftAxis);

 // Step 5: Create Circles
// ==============================
var circlesGroup = chartGroup.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.obesity))
.attr("r", "15")
.attr("fill", "pink")
.attr("opacity", ".5");

// Step 6: Initialize tool tip
// ==============================
var toolTip = d3.tip()
  .attr("class", "d3-tip")
  //.offset([40, -60])
  .html(function(d) {
    // return ('Test');
    return (`${d.state}<br>Poverty Level: ${d.poverty}<br>Physical Activity: ${d.obesity}`);
  });

// Step 7: Create tooltip in the chart
// ==============================
circlesGroup.call(toolTip);

// Step 8: Create event listeners to display and hide the tooltip
// ==============================
circlesGroup.on("mouseover", function(data) {
  toolTip.show(data,this);
  d3.select(this).style("stroke", "#323232")
})
  // onmouseout event
  .on("mouseout", function(data, index) {
    toolTip.hide(data,this);
    d3.select(this).style("stroke", "#e3e3e3")
  });

// Create axes labels
chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 40)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Poverty Level");

chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  .attr("class", "axisText")
  .text("Extent of Physical Activity");
}); 