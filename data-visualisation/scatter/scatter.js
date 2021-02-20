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
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json",
  function (err, data) {
    let time = data.map(function (item) {
      let temptime = item.Time;
      let splittime = temptime.split(":");
      console.log(splittime);
      let date = new Date(1970, 0, 1, 0, splittime[0], splittime[1]);
      return date;
    });
    let year = data.map(function (item) {
      let tempdate = item.Year;
      return tempdate;
    });
    let mmssFormat = d3.timeFormat("%M:%S");
    let xScale = d3
      .scaleTime()
      .domain([d3.min(year) - 1, d3.max(year) + 1])
      .range([0, w]);
    let xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("d"));
    let x = d3.scaleTime().range([0, w]);
    let y = d3.scaleTime().range([0, h]);
    let yScale = d3
      .scaleTime()
      .domain([d3.max(time), d3.min(time)])
      .range([0, h]);
    var yAxis = d3.axisLeft().scale(yScale).tickFormat(d3.timeFormat("%M:%S"));
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
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("data-xvalue", (d, i) => year[i])
      .attr("data-yvalue", (d, i) => time[i])
      .attr("cx", (d, i) => xScale(year[i]) + 60)
      .attr("cy", (d, i) => yScale(time[i]))
      .attr("r", 5)
      .style("fill", function (d, i) {
        if (d.Doping == "") {
          return "#0000FF";
        } else {
          return "#FF0000";
        }
      })
      .on("mouseover", function (d, i) {
        tooltip.transition().style("opacity", 1);
        tooltip
          .html(
            d.Name +
              "-" +
              d.Nationality +
              "<br/>_<br/>" +
              d.Year +
              "-" +
              mmssFormat(time[i]) +
              "<br/>_<br/>" +
              d.Doping
          )
          .attr("data-year", year[i])
          .style("left", xScale(year[i]) + 60 + "px")
          .style("top", yScale(time[i]) + 100 + "px")
          .style("transform", "translateX(250px)");
      })
      .on("mouseout", function (d, i) {
        tooltip.transition().style("opacity", 0);
      });
  }
);
