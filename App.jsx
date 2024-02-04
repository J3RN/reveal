import React, { useEffect, useState } from 'react';
import Parser from 'web-tree-sitter';

/* Language modules */
import * as elixir from './elixir';

import './App.css';

export default function App() {
  const [code, setCode] = useState(undefined);
  const [languageMod, setLanguageMod] = useState(elixir);
  const [parser, setParser] = useState(undefined);
  const [tree, setTree] = useState(undefined);

  const focusTextarea = () => {
    document.querySelector('textarea').focus();
  };

  /* First render stuff */
  useEffect(() => {
    Parser.init({
      locateFile(scriptName, _scriptDirectory) {
        return scriptName;
      },
    }).then(() => setParser(new Parser()));

    focusTextarea();
  }, []);

  useEffect(() => {
    const loadLanguage = async () => {
      const language = await Parser.Language.load(languageMod.treeSitterWasm);
      const code = languageMod.defaultProgram;

      const parser = new Parser();
      parser.setLanguage(language);
      const tree = parser.parse(code);

      setParser(parser);
      setCode(code);
      setTree(tree);
      setLanguageMod(languageMod);
    };
    loadLanguage();
  }, [languageMod]);

  const updateContent = (event) => {
    setCode(event.target.value);
    setTree(parser.parse(event.target.value));
  };

  /* Meant for when the color view is directly editable; not currently used. */
  const placeCursor = (code, cursorPos) => {
    const before = code.slice(0, cursorPos);
    const beginAfter = code.slice(cursorPos, cursorPos + 1) === '\n' ? cursorPos : cursorPos + 1;
    const after = code.slice(beginAfter);
    return before + '█' + after;
  };

  const determineStyle = (cursor) => {
    let color = languageMod.colorMapping[cursor.nodeType];
    let border;
    let colored = true;

    if (color === undefined) {
      color = 'rgba(0,0,0,0)';
      border = 'rgba(0,0,0,0)';
      colored = false;
    } else {
      const [h, s, l] = color;
      const borderLightness = l - 10 < 0 ? 0 : l - 10;
      color = `hsl(${h}deg, ${s}%, ${l}%)`;
      border = `hsl(${h}deg, ${s}%, ${borderLightness}%)`;
    }

    return [colored, { backgroundColor: color, borderColor: border }];
  };

  const renderCode = (text, cursor) => {
    let childCodes = [];
    let lastEnd = cursor.startIndex;

    if (cursor.gotoFirstChild()) {
      do {
        let [childStart, childEnd, childRendered] = renderCode(text, cursor);

        if (childStart > lastEnd) {
          childCodes.push(<>{text.slice(lastEnd, childStart)}</>);
        }

        childCodes.push(childRendered);

        lastEnd = childEnd;
      } while (cursor.gotoNextSibling());

      cursor.gotoParent();
    }

    if (lastEnd < cursor.endIndex) {
      childCodes.push(<>{text.slice(lastEnd, cursor.endIndex)}</>);
    }

    const key = window.crypto.randomUUID();
    const [colored, style] = determineStyle(cursor);
    const className = colored ? 'colored' : '';

    let attrs = { key, style, className };
    if (colored) {
      attrs.title = cursor.nodeType;
    }

    return [cursor.startIndex, cursor.endIndex, <div {...attrs}>{childCodes}</div>];
  };

  let [_start, _end, renderedCode] = tree ? renderCode(code, tree.walk()) : [<></>];

  return (
    <div className="App">
      <textarea onKeyUp={(e) => updateContent(e)} defaultValue={code}></textarea>
      <div className="editor" onClick={() => this.focusTextarea()}>
        {renderedCode}
      </div>
    </div>
  );
}
