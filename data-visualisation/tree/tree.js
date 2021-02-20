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

let vidya =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

d3.json(vidya, function (data) {
  const root = d3.hierarchy(data).sum((d) => d.value);

  d3.treemap().size([w, h]).padding(1)(root);

  svgvar
    .append("g")
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr("class", "tile")
    .attr("data-name", (d) => d.data.name)
    .attr("data-category", (d) => d.data.category)
    .attr("data-value", (d) => d.data.value)
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .style("stroke", "black")
    .style("fill", function (d) {
      console.log(d);
      if (d.data.category == "Wii") {
        return "yellow";
      }
      if (d.data.category == "NES") {
        return "blue";
      }
      if (d.data.category == "GB") {
        return "purple";
      }
      if (d.data.category == "DS") {
        return "green";
      }
      if (d.data.category == "X360") {
        return "orange";
      }
      if (d.data.category == "PS3") {
        return "lightblue";
      }
      if (d.data.category == "PS2") {
        return "darkblue";
      }
      if (d.data.category == "SNES") {
        return "lavender";
      }
      if (d.data.category == "GBA") {
        return "lightgreen";
      }
      if (d.data.category == "PS4") {
        return "pink";
      }
      if (d.data.category == "3DS") {
        return "hotpink";
      }
      if (d.data.category == "N64") {
        return "palevioletred";
      }
      if (d.data.category == "PS") {
        return "slateblue";
      }
      if (d.data.category == "PC") {
        return "limegreen";
      }
      if (d.data.category == "XB") {
        return "darkgreen";
      }
      if (d.data.category == "PSP") {
        return "teal";
      }
      if (d.data.category == "XOne") {
        return "cornsilk";
      }
    })
    .on("mouseover", function (d) {
      tooltip.transition().style("opacity", 1);
      tooltip
        .html(
          d.data.name +
            "<br/> For the " +
            d.data.category +
            "<br/> Sold " +
            d.data.value +
            " million copies"
        )
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px")
        .attr("data-value", d.data.value);
    })
    .on("mouseout", function () {
      tooltip.transition().style("opacity", 0);
    });

  svgvar
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("x", (d) => d.x0 + 5)
    .attr("y", (d) => d.y0 + 10)
    .attr("max-width", (d) => d.x1)
    .attr("font-size", "8pt")
    .text((d) => d.data.name);
});

d3.select(".legend").append("svg").attr("height", 400);

d3.select(".legend")
  .select("svg")
  .append("rect")
  .attr("class", "legend-item")
  .style("fill", "yellow")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 10);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 20)
  .attr("x", 15)
  .text("Nintendo Wii (Wii)");

d3.select(".legend")
  .select("svg")
  .append("rect")
  .attr("class", "legend-item")
  .style("fill", "blue")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 30);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 40)
  .attr("x", 15)
  .text("Nintendo Entertainment System (NES)");

d3.select(".legend")
  .select("svg")
  .append("rect")
  .attr("class", "legend-item")
  .style("fill", "purple")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 50);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 60)
  .attr("x", 15)
  .text("Nintendo GameBoy (GB)");

d3.select(".legend")
  .select("svg")
  .append("rect")
  .attr("class", "legend-item")
  .style("fill", "green")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 70);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 80)
  .attr("x", 15)
  .text("Nintendo DS (DS)");

d3.select(".legend")
  .select("svg")
  .append("rect")
  .attr("class", "legend-item")
  .style("fill", "orange")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 90);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 100)
  .attr("x", 15)
  .text("Microsoft XBox 360 (X360)");

d3.select(".legend")
  .select("svg")
  .append("rect")
  .attr("class", "legend-item")
  .style("fill", "lightblue")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 110);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 120)
  .attr("x", 15)
  .text("Sony PlayStation 3 (PS3)");

d3.select(".legend")
  .select("svg")
  .append("rect")
  .attr("class", "legend-item")
  .style("fill", "darkblue")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 130);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 140)
  .attr("x", 15)
  .text("Sony PlayStation 2 (PS2)");

d3.select(".legend")
  .select("svg")
  .append("rect")
  .attr("class", "legend-item")
  .style("fill", "lavender")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 150);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 160)
  .attr("x", 15)
  .text("Nintendo Super Entertainment System (SNES)");

d3.select(".legend")
  .select("svg")
  .append("rect")
  .attr("class", "legend-item")
  .style("fill", "lightgreen")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 170);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 180)
  .attr("x", 15)
  .text("Nintendo GameBoy Advance (GBA)");

d3.select(".legend")
  .select("svg")
  .append("rect")
  .attr("class", "legend-item")
  .style("fill", "pink")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 190);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 200)
  .attr("x", 15)
  .text("Sony PlayStation 4 (PS4)");

d3.select(".legend")
  .select("svg")
  .append("rect")
  .attr("class", "legend-item")
  .style("fill", "hotpink")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 210);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 220)
  .attr("x", 15)
  .text("Nintendo 3DS (3DS)");

d3.select(".legend")
  .select("svg")
  .append("rect")
  .attr("class", "legend-item")
  .style("fill", "palevioletred")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 230);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 240)
  .attr("x", 15)
  .text("Nintendo N64 (N64)");

d3.select(".legend")
  .select("svg")
  .append("rect")
  .attr("class", "legend-item")
  .style("fill", "slateblue")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 250);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 260)
  .attr("x", 15)
  .text("Sony PlayStation (PS)");

d3.select(".legend")
  .select("svg")
  .append("rect")
  .attr("class", "legend-item")
  .style("fill", "limegreen")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 270);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 280)
  .attr("x", 15)
  .text("Personal Computer (PC)");

d3.select(".legend")
  .select("svg")
  .append("rect")
  .attr("class", "legend-item")
  .style("fill", "darkgreen")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 290);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 300)
  .attr("x", 15)
  .text("Microsoft XBox (XB)");

d3.select(".legend")
  .select("svg")
  .append("rect")
  .attr("class", "legend-item")
  .style("fill", "teal")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 310);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 320)
  .attr("x", 15)
  .text("Sony PlayStation Portable (PSP)");

d3.select(".legend")
  .select("svg")
  .append("rect")
  .attr("class", "legend-item")
  .style("fill", "cornsilk")
  .attr("width", 10)
  .attr("height", 10)
  .attr("y", 330);

d3.select(".legend")
  .select("svg")
  .append("text")
  .attr("y", 340)
  .attr("x", 15)
  .text("Microsoft XBox One (XOne)");
