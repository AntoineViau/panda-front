$(document).ready(function () {
  const rawData = [
    3, 3, 3, 3, 2, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 4, 4, 3, 3, 3, 3,
    3, 3, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 4, 3, 3, 3, 3,
    3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 2,
    2, 3, 3, 3, 3, 4, 3, 3, 4, 3, 3, 3, 3, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 4, 4, 4, 4, 4, 4, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4,
  ];

  function rgbToHex(values) {
    return (
      "#" + values.map((value) => value.toString(16).padStart(2, "0")).join("")
    );
  }

  // set the dimensions and margins of the graph
  const margin = { top: 80, right: 25, bottom: 30, left: 40 },
    width = 600 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select("#stress")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //Read the data
  d3.csv(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv"
  ).then(function (_data) {
    const data = [];
    const now = new Date();
    for (let d = 0; d < 6; d++) {
      for (let h = 0; h < 24; h++) {
        data.push({
          hour: h,
          // getDay, 0 = sunday, 1 = monday, 2 = tuesday, 3 = wednesday, 4 = thursday, 5 = friday, 6 = saturday
          day: (now.getDay() + d) % 7,
          value: rawData[d * 24 + h],
        });
      }
    }

    console.log(data);

    const stressColors = [
      [230, 230, 230],
      [219, 206, 199],
      [208, 183, 168],
      [186, 137, 107],
      [176, 113, 76],
      [165, 90, 45],
    ];

    const hours = Array.from(new Set(data.map((d) => d.hour)));
    const days = Array.from(new Set(data.map((d) => d.day)));

    // Build X scales and axis:
    const x = d3.scaleBand().range([0, width]).domain(hours).padding(0.0);
    svg
      .append("g")
      .style("font-size", 15)
      .attr("transform", `translate(0, 0)`)
      .call(d3.axisTop(x).tickSize(0))
      .select(".domain")
      .remove();

    // Build Y scales and axis:
    const y = d3
      .scaleBand()
      .range([height, 0])
      .domain(days.reverse())
      .padding(0.0);
    svg
      .append("g")
      .style("font-size", 15)
      .call(
        d3
          .axisLeft(y)
          .tickFormat(
            (d) =>
              ({
                0: "Dim",
                1: "Lun",
                2: "Mar",
                3: "Mer",
                4: "Jeu",
                5: "Ven",
                6: "Sam",
              }[d])
          )
          .tickSize(0)
      )
      .select(".domain")
      .remove();

    // create a tooltip
    const tooltip = d3
      .select("#myDataViz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function (event, d) {
      tooltip.style("opacity", 1);
      d3.select(this).style("stroke", "black").style("opacity", 1);
    };
    const mousemove = function (event, d) {
      tooltip
        .html("The exact value of<br>this cell is: " + d.value)
        .style("left", event.x / 2 + "px")
        .style("top", event.y / 2 + "px");
    };
    const mouseleave = function (event, d) {
      tooltip.style("opacity", 0);
      d3.select(this).style("stroke", "none").style("opacity", 0.8);
    };

    // add the squares
    svg
      .selectAll()
      .data(data, function (d) {
        return d.hour + ":" + d.day;
      })
      .join("rect")
      .attr("x", function (d) {
        return x(d.hour);
      })
      .attr("y", function (d) {
        return y(d.day);
      })
      // .attr("rx", 4)
      // .attr("ry", 4)
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", function (d) {
        return rgbToHex(stressColors[d.value]);
      })
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
  });
});
