import React from 'react';
import languages from './languages';

const xPadding = 5;
const yPadding = 5;
const charWidth = 10;
const charHeight = 10;

const colorMap = languages.find((l) => l.name === 'Elixir').colorMapping;

// Helper function to calculate the width of a string in terms of character positions
const strWidth = (str) => str.length * charWidth;

export const renderNode = (xOffset, yOffset, node) => {
  if (typeof node === 'string') return renderString(xOffset, yOffset, node);

  const { label, named, nodeType, children } = node;
  const nodeColor = named ? colorMap[nodeType] || colorMap.default : colorMap.default;

  let pointSets = [];
  let texts = [];
  let thisX = xOffset;
  let thisY = yOffset;

  children.forEach((childNode) => {
    const { obj, points, lastX, lastY } = renderNode(thisX, thisY, childNode);

    pointSets.push(...points);
    texts.push(obj);

    // If the child node contains newlines or wraps to the next line, adjust Y offset
    if (lastY > thisY) {
      thisX = 0; // Start the next node at the beginning of the next line
      thisY = lastY; // Move Y offset to the next line
    } else {
      // Otherwise, continue rendering on the same line
      thisX = lastX;
    }
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

  const style = nodeColor ? { fill: `hsl(${nodeColor}deg, 50%, 90%)` } : { 'fill-opacity': 0.0 };

  return {
    obj: (
      <>
        <polyline
          {...style}
          title={label}
          points={finalPoints.map(([x, y]) => `${x}, ${y}`).join(' ')}
        />
        {texts}
      </>
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
        <polyline fill-opacity="0.0" points={finalPoints.map(([x, y]) => `${x}, ${y}`).join(' ')} />
        {texts}
      </>
    ),
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
