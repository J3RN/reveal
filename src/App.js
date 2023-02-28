import React from 'react';
import Parser from 'web-tree-sitter';
import './App.css';

const colorMapping = {
    call: [56, 19, 98],
    identifier: [27, 18, 99],
    alias: [356, 19, 100],
    arguments: [311, 20, 95],
    keyword: [263, 23, 94],
    keywords: [215, 33, 95],
    string: [195, 41, 96],
    pair: [185, 42, 96],
    do_block: [167, 38, 96],
    binary_operator: [126, 26, 98],
    unary_operator: [126, 26, 98],
    tuple: [126, 26, 98],
    list: [126, 26, 98],
    comment: [185, 42, 96],
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "defmodule Foo.Bar do\n  def hello_world, do: \"Hello, world!\"\nend",
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
    this.setState({ parser: parser, tree: tree });
  }

  updateContent(event) {
    this.setState({ code: event.target.value, tree: this.state.parser.parse(this.state.code) });
  }

  focusTextarea() {
    document.querySelector("textarea").focus();
  }

  placeCursor(code, cursorPos) {
    const before = code.slice(0, cursorPos);
    const beginAfter = code.slice(cursorPos, cursorPos + 1) === "\n" ? cursorPos : cursorPos + 1;
    const after = code.slice(beginAfter);
    return (before + "█" + after);
  }

  renderCode(text, cursor) {
    let childCodes = [];
    let lastEnd = cursor.startIndex;

    if (cursor.gotoFirstChild()) {
      do {
        let [childStart, childEnd, childRendered] = this.renderCode(text, cursor);

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
    const [colored, style] = this.determineStyle(cursor);
    const className = colored ? 'colored' : '';

    let attrs = { key, style, className }
    if (colored) {
      attrs.title = cursor.nodeType
    }

    return [cursor.startIndex, cursor.endIndex, <div {...attrs}>{childCodes}</div>];
  }

  determineStyle(cursor) {
    let color = colorMapping[cursor.nodeType];
    let border;
    let colored = true;

    if (color === undefined) {
      color = "rgba(0,0,0,0)";
      border = "rgba(0,0,0,0)";
      colored = false;
    } else {
      const [h, s, l] = color;
      const borderLightness = l - 10 < 0 ? 0 : l - 10;
      color = `hsl(${h}deg, ${s}%, ${l}%)`;
      border = `hsl(${h}deg, ${s}%, ${borderLightness}%)`;
    }

    return [colored, { backgroundColor: color, borderColor: border }];
  }

  render() {
    let [_start, _end, renderedCode] = (this.state.tree) ? this.renderCode(this.state.code, this.state.tree.walk()) : [<></>];

    return (
      <div className="App" >
        <textarea
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
