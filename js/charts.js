var t = 1297110663, v = 70;

var data1 = d3.range(33).map(function () { return 0; });
var data2 = d3.range(33).map(function () { return 0; });
var data3 = d3.range(33).map(function () { return 0; });

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var onKeyUpCount = 0;
var withDebounceCount = 0;
var withThrottleCount = 0;

function getRecentKeyUpCount () {
  var recentCallCount = countCalls["on-key-up"] - onKeyUpCount;
  onKeyUpCount = countCalls["on-key-up"];
  return recentCallCount;
}

function getRecentWithDebounceCount () {
  var recentCallCount = countCalls["with-debounce"] - withDebounceCount;
  withDebounceCount = countCalls["with-debounce"];
  return recentCallCount;
}

function getRecentWithThrottleCount () {
  var recentCallCount = countCalls["with-throttle"] - withThrottleCount;
  withThrottleCount = countCalls["with-throttle"];
  return recentCallCount;
}

function next(callback) {
  return {
    time: ++t,
    value: callback()
  };
}

var w = 7, h = 60;

var x = d3.scale.linear()
  .domain([0, 1])
  .range([0, w]);

var y = d3.scale.linear()
  .domain([0, 4])
  .rangeRound([0, h]);

function makeChart(chartId, data) {
  var chart = d3.select(chartId)
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

  return chart;
}

function redraw(chart, data) {
  chart.selectAll("rect")
    .data(data)
    .transition()
    .duration(0)
    .attr("y", function(d) { return h - y(d.value) - 0.5; })
    .attr("height", function(d) { return y(d.value); })
};

$( document ).ready(function () {
  var chart1 = makeChart("#plot-on-key-up", data1);
  var chart2 = makeChart("#plot-with-debounce", data2);
  var chart3 = makeChart("#plot-with-throttle", data3);

  setInterval(function () {
    data1.shift();
    data1.push(next(getRecentKeyUpCount));
    data2.shift();
    data2.push(next(getRecentWithDebounceCount));
    data3.shift();
    data3.push(next(getRecentWithThrottleCount));
    redraw(chart1, data1);
    redraw(chart2, data2);
    redraw(chart3, data3);
  }, 250);
})
