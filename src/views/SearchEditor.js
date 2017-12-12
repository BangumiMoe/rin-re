import React from "react";
import PropTypes from "prop-types";
import {
  Editor as DraftEditor,
  EditorState,
  ContentState,
  Modifier,
} from "draft-js";

import "draft-js/dist/Draft.css";
import "./SearchEditor.css";

class SearchEditor extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.string.isRequired,
    autoFocus: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func,
  };
  static defaultProps = {
    defaultValue: "",
    autoFocus: false,
  };

  state = {
    editorState: EditorState.createWithContent(
      ContentState.createFromText(this.props.defaultValue),
    ),
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.editor.focus();
    }
  }

  get value() {
    return this.state.editorState.getCurrentContent().getPlainText();
  }

  focus() {
    this.editor.focus();
  }

  blur() {
    this.editor.blur();
  }

  change(editorState) {
    this.setState({ editorState });
  }

  insert(text, selection = this.state.editorState.getSelection()) {
    const editorState = this.state.editorState;
    this.change(
      EditorState.push(
        editorState,
        Modifier.replaceText(
          editorState.getCurrentContent(),
          selection,
          text.replace(/\r|\n/g, " "),
        ),
      ),
    );
  }

  handleReturn = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
    return "handled";
  };

  handlePastedText = text => {
    this.insert(text);
    return "handled";
  };

  handleDrop = (selection, dataTransfer) => {
    // https://github.com/facebook/draft-js/issues/1454
    /*
    if (dataTransfer.types.includes("text/plain")) {
      const text = dataTransfer.data.getData("text/plain");
      this.insert(text, selection);
    }
    */
    return "handled";
  };

  handleChange = editorState => {
    this.change(editorState);
  };

  render() {
    return (
      <div className="SearchEditor">
        <DraftEditor
          ref={node => (this.editor = node)}
          editorState={this.state.editorState}
          onChange={this.handleChange}
          handleReturn={this.handleReturn}
          handlePastedText={this.handlePastedText}
          handleDrop={this.handleDrop}
        />
      </div>
    );
  }
}

export default SearchEditor;
