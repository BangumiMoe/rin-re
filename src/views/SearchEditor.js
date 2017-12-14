import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { List, Repeat } from "immutable";
import {
  Editor as DraftEditor,
  EditorState,
  SelectionState,
  ContentState,
  ContentBlock,
  BlockMapBuilder,
  CharacterMetadata,
  RichUtils,
  Modifier,
  genKey,
  getDefaultKeyBinding,
} from "draft-js";

import SearchTag from "./SearchTag";

import "draft-js/dist/Draft.css";
import "./SearchEditor.css";

const RE = /`([0-9a-f]{24})`/g;

const strip = text =>
  text
    .replace(/`/g, " ")
    .replace(/\n|\r/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

const parse = text => {
  const fragments = [];

  let lastIndex = 0;
  let group;

  // eslint-disable-next-line no-cond-assign
  while ((group = RE.exec(text))) {
    fragments.push({
      type: "text",
      value: strip(text.slice(lastIndex, group.index)),
    });

    fragments.push({
      type: "tag",
      value: group[1],
    });

    lastIndex = RE.lastIndex;
  }

  fragments.push({
    type: "text",
    value: strip(text.slice(lastIndex)),
  });

  return fragments;
};

const convert = text => {
  let contentState = ContentState.createFromText("");

  const createEntity = (...args) => {
    contentState = contentState.createEntity(...args);
    return contentState.getLastCreatedEntityKey();
  };

  const fragments = parse(text);
  const blocks = fragments.map(
    fragment =>
      fragment.type === "tag"
        ? new ContentBlock({
            key: genKey(),
            type: "atomic",
            text: " ",
            characterList: List.of(
              CharacterMetadata.create({
                entity: createEntity("TAG", "IMMUTABLE", {
                  id: fragment.value,
                }),
              }),
            ),
          })
        : new ContentBlock({
            key: genKey(),
            text: fragment.value,
            characterList: List(
              Repeat(CharacterMetadata.EMPTY, fragment.value.length),
            ),
          }),
  );

  const blockMap = BlockMapBuilder.createFromArray(blocks);
  contentState = contentState.set("blockMap", blockMap);

  return contentState;
};

const Tag = ({ blockProps }) => {
  const id = blockProps.data.id;
  return <SearchTag id={id} />;
};

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
    focused: false,
    editorState: EditorState.createWithContent(
      convert(this.props.defaultValue),
    ),
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.editor.focus();
    }
  }

  get value() {
    const editorState = this.state.editorState;
    const contentState = editorState.getCurrentContent();
    return contentState
      .getBlockMap()
      .toList()
      .map(block => {
        if (block.getType() === "atomic") {
          const entityKey = block.getEntityAt(0);
          const entity = contentState.getEntity(entityKey);
          return "`" + entity.getData().id + "`";
        } else {
          return strip(block.getText());
        }
      })
      .join(" ")
      .trim();
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
        Modifier.replaceWithFragment(
          editorState.getCurrentContent(),
          selection,
          convert(text).getBlockMap(),
        ),
      ),
    );
    // FIXME: merge entity map for draft.js 0.11
  }

  moveTo(blockKey, offset) {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    this.change(
      EditorState.forceSelection(
        editorState,
        selection.merge({
          isBackward: false,
          anchorKey: blockKey,
          anchorOffset: offset,
          focusKey: blockKey,
          focusOffset: offset,
        }),
      ),
    );
  }

  moveToStart() {
    const block = this.state.editorState.getCurrentContent().getFirstBlock();
    this.moveTo(block.getKey(), 0);
  }

  moveToEnd() {
    const block = this.state.editorState.getCurrentContent().getLastBlock();
    this.moveTo(block.getKey(), block.getLength());
  }

  selectTo(blockKey, offset, backward) {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    this.change(
      EditorState.forceSelection(
        editorState,
        selection.merge({
          isBackward: backward,
          focusKey: blockKey,
          focusOffset: offset,
        }),
      ),
    );
  }

  selectToStart() {
    const block = this.state.editorState.getCurrentContent().getFirstBlock();
    this.selectTo(block.getKey(), 0, true);
  }

  selectToEnd() {
    const block = this.state.editorState.getCurrentContent().getLastBlock();
    this.selectTo(block.getKey(), block.getLength(), false);
  }

  blockRendererFn = block => {
    if (block.getType() === "atomic") {
      const editorState = this.state.editorState;
      const contentState = editorState.getCurrentContent();
      const entityKey = block.getEntityAt(0);
      const entity = contentState.getEntity(entityKey);

      if (entity.getType() === "TAG") {
        return {
          editable: false,
          component: Tag,
          props: {
            data: entity.getData(),
          },
        };
      }
    }

    return null;
  };

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

  keyBindingFn = event => {
    // HOME
    if (event.keyCode === 36) {
      if (event.shiftKey) {
        return "select-to-start";
      } else {
        return "move-to-start";
      }
    }

    // END
    if (event.keyCode === 35) {
      if (event.shiftKey) {
        return "select-to-end";
      } else {
        return "move-to-end";
      }
    }

    return getDefaultKeyBinding(event);
  };

  handleKeyCommand = keyCommand => {
    if (keyCommand === "move-to-start") {
      this.moveToStart();
      return "handled";
    }

    if (keyCommand === "select-to-start") {
      this.selectToStart();
      return "handled";
    }

    if (keyCommand === "move-to-end") {
      this.moveToEnd();
      return "handled";
    }

    if (keyCommand === "select-to-end") {
      this.selectToEnd();
      return "handled";
    }

    if (
      keyCommand === "backspace" ||
      keyCommand === "backspace-word" ||
      keyCommand === "backspace-to-start-of-line"
    ) {
      const editorState = this.state.editorState;
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();
      const blockKey = selection.getFocusKey();
      const block = contentState.getBlockForKey(blockKey);

      if (block.getType() === "atomic") {
        const blockBefore = contentState.getBlockBefore(blockKey);
        const blockAfter = contentState.getBlockAfter(blockKey);
        const newContentState = Modifier.removeRange(
          contentState,
          new SelectionState({
            hasFocus: true,
            anchorKey: blockBefore.getKey(),
            anchorOffset: blockBefore.getLength(),
            focusKey: blockAfter.getKey(),
            focusOffset: 0,
          }),
          "backward",
        );
        this.change(
          EditorState.push(editorState, newContentState, "remove-range"),
        );
        return "handled";
      }

      if (selection.isCollapsed() && selection.getFocusOffset() === 0) {
        const blockBefore = contentState.getBlockBefore(blockKey);
        if (blockBefore && blockBefore.getType() === "atomic") {
          const targetBlock = contentState.getBlockBefore(blockBefore.getKey());
          const newContentState = Modifier.removeRange(
            contentState,
            selection.merge({
              isBackward: true,
              focusKey: targetBlock.getKey(),
              focusOffset: targetBlock.getLength(),
            }),
            "backward",
          );
          this.change(
            EditorState.push(editorState, newContentState, "remove-range"),
          );
          return "handled";
        }
      }
    }

    if (
      keyCommand === "delete" ||
      keyCommand === "delete-word" ||
      keyCommand === "delete-to-end-of-block"
    ) {
      const editorState = this.state.editorState;
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();
      const blockKey = selection.getFocusKey();
      const block = contentState.getBlockForKey(blockKey);

      if (block.getType() === "atomic") {
        const blockBefore = contentState.getBlockBefore(blockKey);
        const blockAfter = contentState.getBlockAfter(blockKey);
        const newContentState = Modifier.removeRange(
          contentState,
          new SelectionState({
            hasFocus: true,
            anchorKey: blockBefore.getKey(),
            anchorOffset: blockBefore.getLength(),
            focusKey: blockAfter.getKey(),
            focusOffset: 0,
          }),
          "forward",
        );
        this.change(
          EditorState.push(editorState, newContentState, "remove-range"),
        );
        return "handled";
      }

      if (
        selection.isCollapsed() &&
        selection.getFocusOffset() === block.getLength()
      ) {
        const blockAfter = contentState.getBlockAfter(blockKey);
        if (blockAfter && blockAfter.getType() === "atomic") {
          const targetBlock = contentState.getBlockAfter(blockAfter.getKey());
          const newContentState = Modifier.removeRange(
            contentState,
            selection.merge({
              isBackward: false,
              focusKey: targetBlock.getKey(),
              focusOffset: 0,
            }),
            "forward",
          );
          this.change(
            EditorState.push(editorState, newContentState, "remove-range"),
          );
          return "handled";
        }
      }
    }

    if (
      keyCommand === "backspace" ||
      keyCommand === "backspace-word" ||
      keyCommand === "backspace-to-start-of-line" ||
      keyCommand === "delete" ||
      keyCommand === "delete-word" ||
      keyCommand === "delete-to-end-of-block"
    ) {
      const newEditorState = RichUtils.handleKeyCommand(
        this.state.editorState,
        keyCommand,
      );
      if (newEditorState) {
        this.change(newEditorState);
        return "handled";
      }
    }

    return "not-handled";
  };

  handleChange = editorState => {
    this.change(editorState);
  };

  handleUpArrow = event => {
    event.preventDefault();
    if (event.shiftKey) {
      this.selectToStart();
    } else {
      this.moveToStart();
    }
  };

  handleDownArrow = event => {
    event.preventDefault();
    if (event.shiftKey) {
      this.selectToEnd();
    } else {
      this.moveToEnd();
    }
  };

  handleLeftArrow = event => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const blockKey = selection.getFocusKey();
      const block = contentState.getBlockForKey(blockKey);

      if (block.getType() === "atomic") {
        event.preventDefault();

        const targetBlock = contentState.getBlockBefore(blockKey);
        this.moveTo(targetBlock.getKey(), targetBlock.getLength());

        return;
      }

      if (selection.getFocusOffset() === 0) {
        const blockBefore = contentState.getBlockBefore(blockKey);
        if (blockBefore && blockBefore.getType() === "atomic") {
          event.preventDefault();

          const targetBlock = contentState.getBlockBefore(blockBefore.getKey());
          this.moveTo(targetBlock.getKey(), targetBlock.getLength());

          return;
        }
      }
    }
  };

  handleRightArrow = event => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const blockKey = selection.getFocusKey();
      const block = contentState.getBlockForKey(blockKey);

      if (block.getType() === "atomic") {
        event.preventDefault();

        const targetBlock = contentState.getBlockAfter(blockKey);
        this.moveTo(targetBlock.getKey(), 0);

        return;
      }

      if (selection.getFocusOffset() === block.getLength()) {
        const blockAfter = contentState.getBlockAfter(blockKey);
        if (blockAfter && blockAfter.getType() === "atomic") {
          event.preventDefault();

          const targetBlock = contentState.getBlockAfter(blockAfter.getKey());
          this.moveTo(targetBlock.getKey(), 0);

          return;
        }
      }
    }
  };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleBlur = () => {
    this.setState({ focused: false });
  };

  render() {
    return (
      <div
        className={classNames("SearchEditor", {
          "is-focused": this.state.focused,
        })}
      >
        <DraftEditor
          ref={node => (this.editor = node)}
          editorState={this.state.editorState}
          onChange={this.handleChange}
          blockRendererFn={this.blockRendererFn}
          handleReturn={this.handleReturn}
          handlePastedText={this.handlePastedText}
          handleDrop={this.handleDrop}
          keyBindingFn={this.keyBindingFn}
          handleKeyCommand={this.handleKeyCommand}
          onUpArrow={this.handleUpArrow}
          onDownArrow={this.handleDownArrow}
          onLeftArrow={this.handleLeftArrow}
          onRightArrow={this.handleRightArrow}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

export default SearchEditor;
