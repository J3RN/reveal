// Har har, terrible name for a file and function.
import React from 'react';

export default function Node({ node, language }) {
  const determineStyle = (node) => {
    if (!node.named) return;

    let hue = language.colorMapping[node.nodeType];

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

  const { label: label, named, nodeType, children } = node;
  const childNodes = children.map((child) => <Node node={child} language={language} />);

  const key = window.crypto.randomUUID();
  const style = determineStyle(node);

  let attrs = {
    key,
    style,
  };

  if (style) {
    attrs['title'] = label ? label + ": " + nodeType : nodeType;
    attrs['className'] = 'colored';
  }

  if (named) {
    attrs['data-node-type'] = nodeType;
  }

  return <div {...attrs}>{childNodes}</div>;
}
