import React from 'react';
import Parser from 'web-tree-sitter';
import './App.css';

const colorMapping = {
  call: "#0FF",
  identifier: "#0F0",
  alias: "#AAF",
  arguments: "#FAF",
    /* do: "RGBA(0,0,0,0)", */
    /* ',': "RGBA(0,0,0,0)", */
    /* '"': "#F0F", */
  keyword: "#F00",
  keywords: "#FA0",
    /* quoted_content: "#F0F", */
  string: "#F0F",
  pair: "#222",
    /* end: "RGBA(0,0,0,0)", */
  do_block: "#456",
    /* source: "#123", */
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "defmodule Foo.Bar do\n  def hello_world, do: \"Hello, world!\"\nend",
      cursorPos: 0,
      cursorShown: false,
      parser: undefined,
      tree: undefined
    };
  }

  componentDidMount() {
    Parser.init({
      locateFile(scriptName, scriptDirectory) {
        return scriptName;
      }
    }).then(() => this.initializeParser());
  }

  async initializeParser() {
    let parser = new Parser();
    const Elixir = await Parser.Language.load('tree-sitter-elixir.wasm');
    parser.setLanguage(Elixir);
    const tree = parser.parse(this.state.code);
    Window.tree = tree;
    Window.renderCode = (text, cursor) => this.renderCode(text, cursor);
    this.setState({ parser: parser, tree: tree });
  }

  updateContent(event) {
    this.setState({ code: event.target.value, cursorPos: event.target.selectionStart, tree: this.state.parser.parse(this.state.code) });
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

  renderCode(text, cursor) {
    /* debugger; */

    let childCodes = [];
    let lastEnd = cursor.startIndex;

    if (cursor.gotoFirstChild()) {
      let [childStart, childEnd, childRendered] = this.renderCode(text, cursor);

      if (childStart > lastEnd) {
        childCodes.push(<>{text.slice(lastEnd, childStart)}</>);
      }

      childCodes.push(childRendered);

      lastEnd = childEnd;

      while (cursor.gotoNextSibling()) {
        let [childStart, childEnd, childRendered] = this.renderCode(text, cursor);

        if (childStart > lastEnd) {
          childCodes.push(<span>{text.slice(lastEnd, childStart)}</span>);
        }

        childCodes.push(childRendered);

        lastEnd = childEnd;
      }

      cursor.gotoParent();
    }

    if (lastEnd < cursor.endIndex) {
      childCodes.push(<>{text.slice(lastEnd, cursor.endIndex)}</>);
    }

    const key = window.crypto.randomUUID();
    let color = colorMapping[cursor.nodeType];
    let colored = true;

    if (color === undefined) {
      color = "rgba(0,0,0,0)";
        /* color = "#000"; */
      colored= false;
    }

    const style = { background: color };
    const className = colored ? 'colored' : '';
    return [cursor.startIndex, cursor.endIndex, <span className={className} style={style} key={key} > {childCodes}</span >];
  }

  render() {
    /* let renderedCode = this.state.cursorShown ? this.placeCursor(this.state.code, this.state.cursorPos) : this.state.code; */

    let [_start, _end, renderedCode] = (this.state.tree) ? this.renderCode(this.state.code, this.state.tree.walk()) : [<></>];

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
