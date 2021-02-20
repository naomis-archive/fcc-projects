let w = 1100;
let h = 450;

let svgvar = d3
  .select(".graph")
  .append("svg")
  .attr("width", w + 100)
  .attr("height", h + 100);
let tooltip = d3
  .select(".graph")
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", 0);

d3.json(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  function (err, data) {
    let dataSet = data.data;

    let date = dataSet.map(function (item) {
      let tempdate = new Date(item[0]);
      return tempdate;
    });
    let GDP = dataSet.map(function (item) {
      return item[1];
    });

    let xScale = d3
      .scaleTime()
      .domain([d3.min(date), d3.max(date)])
      .range([0, w]);
    let xAxis = d3.axisBottom().scale(xScale);

    var linearScale = d3
      .scaleLinear()
      .domain([0, d3.max(GDP)])
      .range([0, h]);

    let scaledGDP = GDP.map(function (item) {
      return linearScale(item);
    });

    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(GDP)])
      .range([h, 0]);

    var yAxis = d3.axisLeft(yScale);

    svgvar
      .append("g")
      .call(yAxis)
      .attr("id", "y-axis")
      .attr("transform", "translate(60, 0)");

    svgvar
      .append("g")
      .call(xAxis)
      .attr("id", "x-axis")
      .attr("transform", "translate(60, 450)");

    d3.select("svg")
      .selectAll("rect")
      .data(scaledGDP)
      .enter()
      .append("rect")
      .attr("data-date", function (d, i) {
        return dataSet[i][0];
      })
      .attr("data-gdp", function (d, i) {
        return dataSet[i][1];
      })
      .attr("class", "bar")
      .attr("x", function (d, i) {
        return xScale(date[i]);
      })
      .attr("y", function (d, i) {
        return h - d;
      })
      .attr("width", w / 275)
      .attr("height", function (d) {
        return d;
      })
      .style("fill", "#3a3240")
      .attr("transform", "translate(60, 0)")
      .on("mouseover", function (d, i) {
        tooltip.transition().style("opacity", 1);
        tooltip
          .html("$" + GDP[i] + " billion")
          .attr("data-date", dataSet[i][0])
          .style("left", i * (w / 275) + "px")
          .style("top", h - 100 + "px")
          .style("transform", "translateX(250px)");
      })
      .on("mouseout", function (d) {
        tooltip.transition().style("opacity", 0);
      });
  }
);
