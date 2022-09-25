import React from 'react';
import Parser from 'web-tree-sitter';
import './App.css';

const treeSitterWasm = require('web-tree-sitter/tree-sitter.wasm');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "defmodule Foo.Bar do\n  def hello_world, do: \"Hello, world!\"\nend",
      cursorPos: 0,
      cursorShown: false,
      parser: undefined
    };

    Parser.init().then(() => this.initializeParser());
  }

  async initializeParser() {
    let parser = new Parser();
    const Elixir = await Parser.Language.load('tree-sitter-elixir.wasm');
    parser.setLanguage(Elixir);
    this.setState({ parser: parser });
  }

  updateContent(event) {
    this.setState({ code: event.target.value, cursorPos: event.target.selectionStart });
  }

  focusTextarea() {
    document.querySelector("textarea").focus();
    this.setState({ cursorShown: true });
  }

  placeCursor(code, cursorPos) {
    const before = code.slice(0, cursorPos);
    const beginAfter = code.slice(cursorPos, cursorPos + 1) === "\n" ? cursorPos : cursorPos + 1;
    const after = code.slice(beginAfter);
    return (before + "█" + after);
  }

  render() {
    let renderedCode = this.state.cursorShown ? this.placeCursor(this.state.code, this.state.cursorPos) : this.state.code;

    return (
      <div className="App" >
        <textarea
          onBlur={() => this.setState({ cursorShown: false })}
          onFocus={() => this.setState({ cursorShown: true })}
          onKeyUp={(e) => this.updateContent(e)}
          onKeyDown={(e) => this.updateContent(e)}
          //onChange={(e) => this.updateContent(e)}
          defaultValue={this.state.code}></textarea>
        <div className="editor" onClick={() => this.focusTextarea()}>
          {renderedCode}
        </div>
      </div>
    );
  }
}

export default App;
