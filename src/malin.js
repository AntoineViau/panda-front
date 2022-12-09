let idx = 0;
$(document).ready(function () {
  const rawDatas = [
    [
      3, 3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 1, 1, 1, 2, 1, 1, 0, 0, 0, 0, 1, 2, 2, 2,
      3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3,
      3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 3,
      3, 3, 3, 2, 1, 0, 0, 1, 1, 1, 2, 2, 2, 1, 0, 0, 0, 1, 1, 2, 3, 3, 3, 3, 3,
      3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3,
      3, 2, 2, 1, 1, 2, 2, 2, 2, 3, 2, 1, 0, 0, 0, 0, 1, 1, 1,
    ],
    [
      3, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 2, 3,
      3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 2, 1, 0, 0, 1, 1, 2, 2, 2, 2,
      3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 1, 0, 0, 1, 1, 1, 1, 2, 2, 2,
      3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 3,
      3, 3, 2, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 2, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3,
      3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3,
      2, 1, 1, 1, 1, 2, 2, 3, 3, 2, 1, 0, 0, 0, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3,
      3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 0, 0, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 2,
      2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0, 1, 1, 1, 2, 2, 2, 2, 3, 2, 1, 0, 0, 0,
      0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 1, 1, 0, 1,
      1, 2, 2, 3, 3, 3, 2, 1, 0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0, 1, 1,
      2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 1, 1, 1, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 2,
      2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3,
      3, 3, 3, 3, 2, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3,
      3, 3, 3, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 1, 1, 0, 1, 1, 1, 2, 2, 2, 2,
      2, 1, 0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0, 1, 1, 1, 1, 1, 2, 1, 0,
      0, 0, 0, 0, 1, 1, 1, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 0,
      0, 0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 0,
      0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 2, 1, 1,
      1, 2, 2, 2, 2, 2, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
      1, 1, 2, 2, 3, 3, 3, 3, 3, 2, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2,
      3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 1, 1, 1,
      1, 3, 3, 3, 3, 3, 3, 2, 1, 0, 1, 1, 1, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 2,
      3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 2, 2, 2, 2,
      3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 2, 2, 2, 2,
      2, 3, 2, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2,
      3, 3, 2, 1, 0, 0, 0, 1, 1, 1, 2, 2, 2, 1, 1, 0, 0, 1, 2, 2, 2, 3, 3, 3, 3,
      3, 3, 2, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 3, 3, 3, 3, 3,
      3, 2, 1, 0, 0, 1, 1, 1, 1, 2, 2, 1, 0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3,
      3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 2, 1, 0, 0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3,
      2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 1, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 2, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 2, 1, 1,
      1, 2, 2, 2, 3, 3, 3, 2, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1,
      1, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3,
      3, 3, 3, 3, 3, 1, 0, 0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3,
      3, 3, 3, 3, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 2, 1, 0, 1, 1, 1, 2, 2, 2,
      2, 2, 1, 0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1,
      0, 0, 0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 1,
      0, 0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 1,
      1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
      0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 2, 1, 0, 1, 1, 2, 2, 2, 3, 2, 2, 1, 0, 1, 1,
      2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 1, 1,
      1, 1, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2,
      3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 1, 0, 0, 1, 2, 2, 2,
      2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 2, 2, 2,
      2, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3,
      3, 3, 3, 3, 2, 1, 0, 1, 1, 2, 2, 2, 3, 2, 2, 1, 0, 1, 2, 2, 3, 3, 3, 3, 3,
      3, 3, 3, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 1, 1, 1, 1, 3, 3, 3, 3,
      3, 3, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 3, 3, 3, 3, 3, 3,
      3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3,
      3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 1, 1,
      0, 0, 1, 1, 1, 2, 2, 2, 1, 1, 0, 0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1,
      1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3,
      3, 3, 3, 3, 3, 3, 1, 0, 0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3,
      3, 3, 3, 3, 3, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 2, 1, 0, 1, 1, 2, 2, 2,
      3, 2, 2, 1, 0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1, 1, 2, 2,
      1, 1, 0, 0, 0, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 2, 2, 2, 2, 3, 2,
      1, 0, 0, 0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3,
      1, 0, 0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2,
      1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 2, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
      0, 0, 1, 1, 1, 2, 2, 3, 3, 3, 3, 1, 1, 0, 1, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0,
      1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0,
      1, 1, 1,
    ],
  ];

  const malinColors = [
    [206, 61, 61],
    [206, 162, 78],
    [170, 191, 138],
    [72, 174, 128],
  ];

  heatmap("#malin", rawDatas[0], malinColors);

  $("#change").click(function () {
    idx = idx === 0 ? 1 : 0;
    update("#malin", rawDatas[idx], malinColors);
  });
});
