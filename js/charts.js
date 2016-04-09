var t = 1297110663, v = 70, data = d3.range(33).map(next);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function next() {
  return {
    time: ++t,
    value: v = getRandomInt(0,10)
  };
}

var w = 7, h = 60;

var x = d3.scale.linear()
  .domain([0, 1])
  .range([0, w]);

var y = d3.scale.linear()
  .domain([0, 10])
  .rangeRound([0, h]);

var chart = d3.select("#graph")
  .append("svg:svg")
  .attr("class", "chart")
  .attr("width", w * data.length - 1)
  .attr("height", h)
  .style('background', '#dff0d8');

chart.selectAll("rect")
  .data(data)
  .enter().append("svg:rect")
  .attr("x", function(d, i) { return x(i) - .5; })
  .attr("y", function(d) { return h - y(d.value) - .5; })
  .attr("width", w)
  .attr("height", function(d) { return y(d.value); });

chart.append("svg:line")
  .attr("x1", 0)
  .attr("x2", w * data.length)
  .attr("y1", h - 0.5)
  .attr("y2", h - 0.5)
  .attr("stroke", "#000");

function redraw() {
  chart.selectAll("rect")
    .data(data)
    .transition()
    .duration(0)
    .attr("y", function(d) { return h - y(d.value) - 0.5; })
    .attr("height", function(d) { return y(d.value); })
};

$( document ).ready(function () {
  setInterval(function () {
    data.shift();
    data.push(next());
    redraw();
  }, 250);
})
