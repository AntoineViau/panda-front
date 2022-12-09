$(document).ready(function () {
  const rawData = [
    3, 3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 1, 1, 1, 2, 1, 1, 0, 0, 0, 0, 1, 2, 2, 2,
    3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3,
    3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 3,
    3, 3, 3, 2, 1, 0, 0, 1, 1, 1, 2, 2, 2, 1, 0, 0, 0, 1, 1, 2, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3,
    3, 2, 2, 1, 1, 2, 2, 2, 2, 3, 2, 1, 0, 0, 0, 0, 1, 1, 1,
  ];

  function rgbToHex(values) {
    return (
      "#" + values.map((value) => value.toString(16).padStart(2, "0")).join("")
    );
  }

  // set the dimensions and margins of the graph
  const margin = { top: 20, right: 25, bottom: 0, left: 40 },
    width = 600 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select("#malin")
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

    const malinColors = [
      [206, 61, 61],
      [206, 162, 78],
      [170, 191, 138],
      [72, 174, 128],
    ];

    const hours = Array.from(new Set(data.map((d) => d.hour)));
    const days = Array.from(new Set(data.map((d) => d.day)));

    // Build X scales and axis:
    const x = d3.scaleBand().range([0, width]).domain(hours).padding(0.05);
    svg
      .append("g")
      .style("font-size", 15)
      .style("max-width", "100%")
      .attr("transform", `translate(0, 0)`)
      .call(d3.axisTop(x).tickSize(0))
      .select(".domain")
      .remove();

    // Build Y scales and axis:
    const y = d3
      .scaleBand()
      .range([height, 0])
      .domain(days.reverse())
      .padding(0.05);
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
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", function (d) {
        return rgbToHex(malinColors[d.value]);
      })
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
  });
});
