import React, { useEffect, useState } from 'react';
import Parser from 'web-tree-sitter';

import './App.css';

/* Language modules */
import * as elixir from './elixir';
import * as javascript from './javascript';
import * as reasonml from './reasonml';
import * as python from './python';

export default function App() {
  const mapping = {
    JavaScript: javascript,
    Elixir: elixir,
    Python: python,
    ReasonML: reasonml,
  };

  const [code, setCode] = useState(undefined);
  const [language, setLanguage] = useState('JavaScript');
  const [languageMod, setLanguageMod] = useState(undefined);
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
    if (parser && code) setTree(parser.parse(code));
  }, [code]);

  useEffect(() => {
    const loadLanguage = async () => {
      const languageWasm = await Parser.Language.load(languageMod.treeSitterWasm);
      const code = languageMod.defaultProgram;

      parser.setLanguage(languageWasm);

      setParser(parser);
      setCode(code);
    };
    if (languageMod && parser) loadLanguage();
  }, [languageMod, parser]);

  useEffect(() => {
    setLanguageMod(mapping[language]);
  }, [language]);

  const updateContent = (event) => {
    setCode(event.target.value);
  };

  /* Meant for when the color view is directly editable; not currently used. */
  const placeCursor = (code, cursorPos) => {
    const before = code.slice(0, cursorPos);
    const beginAfter = code.slice(cursorPos, cursorPos + 1) === '\n' ? cursorPos : cursorPos + 1;
    const after = code.slice(beginAfter);
    return before + '█' + after;
  };

  const determineStyle = (cursor) => {
    let hue = languageMod.colorMapping[cursor.nodeType];

    if (hue !== undefined) {
      return {
        backgroundColor: `hsl(${hue}deg, 50%, 90%)`,
        borderColor: `hsl(${hue}deg, 50%, 80%)`,
      };
    }
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
    const style = determineStyle(cursor);
    const className = style ? 'colored' : '';

    let attrs = { key, style, className };
    if (style) {
      attrs.title = cursor.nodeType;
    }

    return [
      cursor.startIndex,
      cursor.endIndex,
      <div data-node-type={cursor.nodeType} {...attrs}>
        {childCodes}
      </div>,
    ];
  };

  let [_start, _end, renderedCode] = tree ? renderCode(code, tree.walk()) : [<></>];

  const selectSetLanguage = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="App">
      <div className="tool-bar">
        <select onChange={selectSetLanguage} value={language}>
          {Object.keys(mapping).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div className="editor-box">
        <textarea className="raw-editor" onChange={updateContent} value={code}></textarea>
        <div className="editor" onClick={focusTextarea}>
          {renderedCode}
        </div>
      </div>
    </div>
  );
}
