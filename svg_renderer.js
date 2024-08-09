import React from "react";

const xPadding = 5;
const yPadding = 5;
const charWidth = 10;
const charHeight = 10;

export const renderNode = (xOffset, yOffset, node) => {
  if (typeof node === "string") return renderString(xOffset, yOffset, node);

  const {label, named, nodeType, children} = node;
};

export const renderString = (xOffset, yOffset, str) => {
  const lines = str.split("\n");

  let pointSets = [];
  let texts = [];
  let thisX = xOffset;
  let thisY = yOffset;

  lines.forEach((line) => {
    let thisLine = linePoints(thisX, thisY, line);
    pointSets.push(thisLine);
    texts.push(
      <text
        textAnchor="start"
        x={thisX + xPadding}
        y={thisY + yPadding + charHeight}
      >
        {line}
      </text>,
    );
    thisX = 1;
    thisY += yPadding + charHeight + yPadding;
  });

  const finalPoints = pointSets
        .map((pointSet) => pointSet.slice(0, 2))
        .flat()
        .concat(
          pointSets
            .reverse()
            .map((pointSet) => pointSet.slice(2))
            .flat(),
        );

  return {
    obj: (
      <>
        <polyline
          fill="cyan"
          points={finalPoints.map(([x, y]) => `${x}, ${y}`).join(" ")}
        />
        {texts}
      </>
    ),
    points: pointSets,
  };
};

const linePoints = (xOffset, yOffset, line) => [
  // top-right
  [xOffset + line.length * charWidth + 2 * xPadding, yOffset],
  // bottom-right
  [
    xOffset + line.length * charWidth + 2 * xPadding,
    yOffset + charHeight + 2 * yPadding,
  ],
  // bottom-left
  [xOffset, yOffset + charHeight + 2 * yPadding],
  // top-left
  [xOffset, yOffset],
];
