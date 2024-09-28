import React from 'react';
import languages from './languages';

const xPadding = 5;
const yPadding = 5;
const charWidth = 10;
const charHeight = 10;

const colorMap = languages.find((l) => l.name === 'Elixir').colorMapping;

// Helper function to calculate the width of a string in terms of character positions
const strWidth = (str) => str.length * charWidth;

/* Our children's points are, give-or-take, our boundary */
const boundary = (pointSets) => {
  let points = [];

  points.push(pointSets[0][0]);
};

export const renderNode = (xOffset, yOffset, node) => {
  if (typeof node === 'string') return renderString(xOffset, yOffset, node);

  const { label, named, nodeType, children } = node;
  const nodeColor = colorMap[nodeType];

  let pointSets = [];
  let childElements = [];
  let thisX = xOffset; /* + (nodeColor ? xPadding : 0) */
  let thisY = yOffset; /* + (nodeColor ? yPadding : 0) */

  children.forEach((childNode) => {
    const { obj, points, lastX, lastY } = renderNode(thisX, thisY, childNode);

    childElements.push(obj);
    pointSets.push(points);
    thisX = lastX;
    thisY = lastY;
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
      <g title={nodeType}>
        {nodeColor && (
          <polyline
            fill={`hsl(${nodeColor}deg, 50%, 90%)`}
            title={label}
            points={finalPoints.map(([x, y]) => `${x}, ${y}`).join(' ')}
          />
        )}
        {childElements}
      </g>
    ),
    points: pointSets,
    lastX: thisX, // Track the last X position for the next node
    lastY: thisY, // Track the last Y position for the next node
  };
};

export const renderString = (xOffset, yOffset, str) => {
  const lines = str.split('\n');

  let pointSets = [];
  let texts = [];
  let thisX = xOffset;
  let thisY = yOffset;

  lines.forEach((line, index) => {
    let thisLine = linePoints(thisX, thisY, line);
    pointSets.push(thisLine);
    texts.push(
      <text textAnchor="start" x={thisX + xPadding} y={thisY + yPadding + charHeight} fill="black">
        {line}
      </text>,
    );

    // If there are multiple lines, move to the next line for subsequent text
    if (index < lines.length - 1) {
      thisX = 0; // Reset to the beginning of the line
      thisY += charHeight + 2 * yPadding; // Move to the next line
    } else {
      thisX += strWidth(line) + 2 * xPadding; // Continue on the same line
    }
  });

  return {
    obj: <>{texts}</>,
    points: pointSets,
    lastX: thisX, // Return the last X position for proper alignment
    lastY: thisY, // Return the last Y position to know if new lines were added
  };
};

// Utility to calculate points for each line of text
const linePoints = (xOffset, yOffset, line) => [
  // top-right
  [xOffset + strWidth(line) + 2 * xPadding, yOffset],
  // bottom-right
  [xOffset + strWidth(line) + 2 * xPadding, yOffset + charHeight + 2 * yPadding],
  // bottom-left
  [xOffset, yOffset + charHeight + 2 * yPadding],
  // top-left
  [xOffset, yOffset],
];

const linePointsPrime = (points) => {
  /* debugger; */
  let minX = points[0][0],
    minY = points[0][1],
    maxX = points[0][0],
    maxY = points[0][1];

  for (const point of points) {
    if (point[0] < minX) minX = point[0];
    if (point[0] > maxX) maxX = point[0];
    if (point[1] < minY) minY = point[1];
    if (point[1] > maxY) maxY = point[1];
  }

  return [
    [maxX, minY],
    [maxX, maxY],
    [minX, maxY],
    [minX, minY],
  ];
};
