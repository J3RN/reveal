import React, { useEffect, useState } from 'react';
import Parser from 'web-tree-sitter';
import languages from './languages';

import './App.css';

export default function App() {
  const lookupLanguage = (name) => languages.find((lang) => lang.name === name);

  const defaultLanguageName = 'JavaScript';

  const [language, setLanguage] = useState(
    lookupLanguage(window.localStorage.getItem('revealLang') || defaultLanguageName),
  );
  const [code, setCode] = useState(
    window.localStorage.getItem('revealCode') || language.defaultProgram,
  );
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
    if (language && parser) {
      Parser.Language.load(language.treeSitterWasm).then((languageWasm) => {
        parser.setLanguage(languageWasm);
        setTree(parser.parse(code));
      });
    }
  }, [parser, language]);

  useEffect(() => {
    window.localStorage.setItem('revealCode', code);
    if (code && parser && parser.getLanguage()) {
      setTree(parser.parse(code));
    }
  }, [parser, code]);

  useEffect(() => {
    window.localStorage.setItem('revealLang', language.name);
  }, [language]);

  /* Meant for when the color view is directly editable; not currently used. */
  const placeCursor = (code, cursorPos) => {
    const before = code.slice(0, cursorPos);
    const beginAfter = code.slice(cursorPos, cursorPos + 1) === '\n' ? cursorPos : cursorPos + 1;
    const after = code.slice(beginAfter);
    return before + '█' + after;
  };

  const determineStyle = (cursor) => {
    let hue = language.colorMapping[cursor.nodeType];

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

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleLanguageChange = (event) => {
    const languageMod = lookupLanguage(event.target.value);
    setLanguage(languageMod);
    setCode(languageMod.defaultProgram);
  };

  const reset = () => {
    setCode(language.defaultProgram);
  };

  let [_start, _end, renderedCode] = tree ? renderCode(code, tree.walk()) : [<></>];

  return (
    <div className="App">
      <div className="tool-bar">
        <select onChange={handleLanguageChange} value={language.name}>
          {languages.map((lang) => (
            <option key={lang.name} value={lang.name}>
              {lang.name}
            </option>
          ))}
        </select>
        <button className="reset" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="editor-box">
        <textarea className="raw-editor" onChange={handleCodeChange} value={code}></textarea>
        <div className="editor" onClick={focusTextarea}>
          {renderedCode}
        </div>
      </div>
    </div>
  );
}
