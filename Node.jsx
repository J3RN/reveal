// Har har, terrible name for a file and function.
import React from 'react';

export default function Node({ node, language }) {
  const determineStyle = (nodeType) => {
    let hue = language.colorMapping[nodeType];

    if (hue !== undefined) {
      return {
        backgroundColor: `hsl(${hue}deg, 50%, 90%)`,
        borderColor: `hsl(${hue}deg, 50%, 80%)`,
      };
    }
  };

  if (typeof node === 'string') {
    return <>{node}</>;
  }

  const { nodeType, children } = node;
  const childNodes = children.map((child) => <Node node={child} language={language} />);

  const key = window.crypto.randomUUID();
  const style = determineStyle(nodeType);
  const className = style ? 'colored' : '';

  let attrs = {
    key,
    style,
    className,
  };
  if (style) {
    attrs.title = nodeType;
  }

  return (
    <div data-node-type={nodeType} {...attrs}>
      {childNodes}
    </div>
  );
}
