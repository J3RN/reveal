import React from 'react';
import Parser from 'web-tree-sitter';
import * as elixir from './elixir';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: undefined,
            languageMod: undefined,
            parser: undefined,
            tree: undefined
        };
    }

    componentDidMount() {
        Parser.init({
            locateFile(scriptName, _scriptDirectory) {
                return scriptName;
            }
        }).then(() => this.setState({parser: new Parser()}))
          .then(() => this.initializeParser(elixir));
    }

    async initializeParser(languageMod) {
        const language = await Parser.Language.load(languageMod.treeSitterWasm);
        this.state.parser.setLanguage(language);
        const code = languageMod.defaultProgram;
        const tree = this.state.parser.parse(code);

        this.setState({ code, tree, languageMod });
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
        let color = this.state.languageMod.colorMapping[cursor.nodeType];
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
