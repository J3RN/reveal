import React, { useEffect, useState } from 'react';
import Parser from 'web-tree-sitter';

import ToolBar from './ToolBar';
import Node from './Node';
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

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleLanguageChange = (event) => {
    const languageMod = lookupLanguage(event.target.value);
    setLanguage(languageMod);
    setCode(languageMod.defaultProgram);
  };

  const handleReset = () => {
    setCode(language.defaultProgram);
  };

  /* Converts the textual code + tree-sitter cursor to a tree of objects */
  const toNode = (text, cursor) => {
    let children = [];
    let lastEnd = cursor.startIndex;

    if (cursor.gotoFirstChild()) {
      do {
        let [childStart, childEnd, child] = toNode(text, cursor);

        if (childStart > lastEnd) {
          children.push(text.slice(lastEnd, childStart));
        }

        children.push(child);

        lastEnd = childEnd;
      } while (cursor.gotoNextSibling());

      cursor.gotoParent();
    }

    if (lastEnd < cursor.endIndex) {
      children.push(text.slice(lastEnd, cursor.endIndex));
    }

    return [
      cursor.startIndex,
      cursor.endIndex,
      {
        label: cursor.currentFieldName(),
        named: cursor.nodeIsNamed,
        nodeType: cursor.nodeType,
        children,
      },
    ];
  };

  let [_start, _end, rootNode] = tree ? toNode(code, tree.walk()) : [0, 0, ''];
  let root = language ? <Node node={rootNode} language={language} /> : <></>;

  return (
    <div className="App">
      <ToolBar
        language={language}
        languages={languages}
        handleLanguageChange={handleLanguageChange}
        handleReset={handleReset}
      />
      <div className="editor-box">
        <textarea className="raw-editor" onChange={handleCodeChange} value={code}></textarea>
        <div className="editor" onClick={focusTextarea}>
          {root}
        </div>
      </div>
    </div>
  );
}
