let x, y;

function heatmap(containerId, rawData, colors) {
  const margin = { top: 110, right: 25, bottom: 30, left: 60 },
    width = 850 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

  const svg = d3
    .select(containerId)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const data = convertRawData(rawData);
  const hours = Array.from(new Set(data.map((d) => d.hour)));
  const days = Array.from(new Set(data.map((d) => d.day)));
  x = d3.scaleBand().range([0, width]).domain(hours).padding(0.0);
  svg
    .append("g")
    .style("font-size", 15)
    .style("max-width", "100%")
    .attr("transform", `translate(0, 0)`)
    .call(d3.axisTop(x).tickSize(0))
    .select(".domain")
    .remove();

  y = d3.scaleBand().range([height, 0]).domain(days.reverse()).padding(0.0);
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

  for (let t = 0; t < 4; t++) {
    setTimeout(
      () =>
        cells(
          svg,
          data.filter((d) => d.value === t),
          colors
        ),
      500 * t + 500
    );
  }

  setTimeout(() => {
    // Vertical lines
    for (let i = 3; i < 24; i += 3) {
      const xv = i * x.bandwidth();
      svg
        .append("line")
        .transition()
        .style("stroke-opacity", 0.5)
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .style("width", "8px")
        .attr("x1", xv)
        .attr("y1", -20)
        .attr("x2", xv)
        .attr("y2", 400);
    }
  }, 2500);
  // Add title to graph
  svg
    .append("text")
    .attr("x", 300)
    .attr("y", -72)
    .attr("text-anchor", "middle")
    .style("font-size", "40px")
    .style("font-weight", "bold")
    .text("Les prévisions de Panda Malin");

  // Add subtitle to graph
  svg
    .append("text")
    .attr("x", 350)
    .attr("y", -41)
    .attr("text-anchor", "middle")
    .style("font-size", "29px")
    .style("fill", "grey")
    .style("max-width", 400)
    .text("Choisissez le meilleur moment pour utiliser l'électricité!");
}

function update(containerId, rawData, colors) {
  const data = convertRawData(rawData);
  const svg = d3.select(containerId);
  svg
    .selectAll(".cell")
    .data(data, function (d) {
      return d.hour + ":" + d.day;
    })
    .transition()
    .style("fill", function (d) {
      return rgbToHex(colors[d.value]);
    });
}

function convertRawData(rawData) {
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
  return data;
}

function cells(svg, data, colors) {
  // Cells
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
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", function (d) {
      return "white";
    })

    .transition()
    .style("fill", function (d) {
      return rgbToHex(colors[d.value]);
    })
    .style("stroke-width", 4)
    .style("stroke", "none")
    .attr("class", "cell");
}

function rgbToHex(values) {
  return (
    "#" + values.map((value) => value.toString(16).padStart(2, "0")).join("")
  );
}
