let education =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

let county =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

let w = 1100;
let h = 500;

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

d3.queue().defer(d3.json, county).defer(d3.json, education).await(ready);

function ready(error, county, education) {
  if (error) {
    console.log(error);
  }
  svgvar
    .append("g")
    .attr("class", "map")
    .selectAll("path")
    .data(topojson.feature(county, county.objects.counties).features)
    .enter()
    .append("path")
    .attr("class", "county")
    .attr("data-fips", (d) => d.id)
    .attr("data-education", function (d) {
      let check = education.filter((item) => item.fips == d.id);
      return check[0].bachelorsOrHigher;
    })
    .attr("d", d3.geoPath())
    .attr("fill", function (d) {
      let check = education.filter((item) => item.fips == d.id);
      let colour = "";
      if (check[0].bachelorsOrHigher >= 0) {
        colour = "#541380";
      }
      if (check[0].bachelorsOrHigher >= 25) {
        colour = "#7c2db3";
      }
      if (check[0].bachelorsOrHigher >= 50) {
        colour = "#b76ceb";
      }
      if (check[0].bachelorsOrHigher >= 75) {
        colour = "#e4bdff";
      }
      return colour;
    })
    .on("mouseover", function (d) {
      tooltip.transition().style("opacity", 1);
      tooltip
        .html(function () {
          let check = education.filter((item) => item.fips == d.id);
          return (
            check[0].area_name +
            ", " +
            check[0].state +
            " - " +
            check[0].bachelorsOrHigher +
            "% of the population has a bachelor's degree."
          );
        })
        .attr("data-education", function () {
          let check = education.filter((item) => item.fips == d.id);
          return check[0].bachelorsOrHigher;
        })
        .style("left", "1200px")
        .style("top", "300px");
    })
    .on("mouseout", function (d) {
      tooltip.transition().style("opacity", 0);
    });
}

d3.select(".legend")
  .append("svg")
  .append("rect")
  .style("fill", "#541380")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 10);

d3.select(".legend")
  .select("svg")
  .append("rect")
  .style("fill", "#7c2db3")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 30);

d3.select(".legend")
  .select("svg")
  .append("rect")
  .style("fill", "#b76ceb")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 50);

d3.select(".legend")
  .select("svg")
  .append("rect")
  .style("fill", "#e4bdff")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 70);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 20)
  .attr("x", 15)
  .text("< 25% education rate");

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 40)
  .attr("x", 15)
  .text("25% to 50% education rate");

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 60)
  .attr("x", 15)
  .text("50% to 75% education rate");

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 80)
  .attr("x", 15)
  .text("> 75% education rate");
