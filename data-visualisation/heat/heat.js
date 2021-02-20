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
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json",
  function (error, data) {
    let dataset = data.monthlyVariance;
    let year = dataset.map(function (item) {
      let tempyear = item.year;
      let tempDate = new Date(tempyear, 0, 1, 0);
      return tempyear;
    });

    let month = dataset.map(function (item) {
      let tempmonth = item.month;
      return tempmonth;
    });
    let variance = dataset.map(function (item) {
      let tempVariance = item.variance;
      return tempVariance;
    });
    let xScale = d3
      .scaleLinear()
      .domain([d3.min(year), d3.max(year)])
      .range([0, w]);
    let xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("d"));
    let x = d3.scaleTime().range([0, w]);
    let y = d3.scaleTime().range([0, h]);
    let yScale = d3
      .scaleLinear()
      .domain([0, 11])
      .range([25, h - 25]);
    var yAxis = d3
      .axisLeft()
      .scale(yScale)
      .tickFormat(function (d) {
        let tickDate = new Date(1970, d, 1, 0);
        return d3.timeFormat("%B")(tickDate);
      });
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
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("data-month", (d) => d.month - 1)
      .attr("data-year", (d) => d.year)
      .attr("data-temp", (d) => 8.66 + d.variance)
      .attr("x", (d) => xScale(d.year) + 60)
      .attr("y", (d) => yScale(d.month - 1))
      .attr("height", 25)
      .attr("width", 3.5)
      .attr("fill", function (d) {
        if (8.66 + d.variance < 2) {
          return "#0000FF";
        } else if (8.66 + d.variance < 4) {
          return "#000088";
        } else if (8.66 + d.variance < 6) {
          return "#440044";
        } else if (8.66 + d.variance < 8) {
          return "#880000";
        } else {
          return "#FF0000";
        }
      })
      .on("mouseover", function (d, i) {
        tooltip.transition().style("opacity", 1);
        tooltip
          .html(
            d.month + "/" + d.year + "<br>" + (8.66 + d.variance).toFixed(2)
          )
          .attr("data-year", d.year)
          .style("left", xScale(d.year) + "px")
          .style("top", yScale(d.month) + 20 + "px")
          .style("transform", "translateX(250px)");
      })
      .on("mouseout", function (d, i) {
        tooltip.transition().style("opacity", 0);
      });
  }
);

d3.select(".legend")
  .append("svg")
  .append("rect")
  .style("fill", "#0000FF")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 10);

d3.select(".legend")
  .select("svg")
  .append("rect")
  .style("fill", "#000088")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 30);

d3.select(".legend")
  .select("svg")
  .append("rect")
  .style("fill", "#440044")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 50);

d3.select(".legend")
  .select("svg")
  .append("rect")
  .style("fill", "#880000")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 70);

d3.select(".legend")
  .select("svg")
  .append("rect")
  .style("fill", "#FF0000")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 90);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 20)
  .attr("x", 15)
  .text("2 degrees");

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 40)
  .attr("x", 15)
  .text("4 degrees");

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 60)
  .attr("x", 15)
  .text("6 degrees");

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 80)
  .attr("x", 15)
  .text("8 degrees");

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 100)
  .attr("x", 15)
  .text(">8 degrees");
