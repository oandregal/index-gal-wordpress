import { createElement, useState } from "react";
import { createRoot } from 'react-dom/client';
import {
  BlockEditorProvider,
  BlockCanvas,
} from "@wordpress/block-editor";
import { registerCoreBlocks } from "@wordpress/block-library";

// Default styles that are needed for the editor.
import "@wordpress/components/build-style/style.css";
import "@wordpress/block-editor/build-style/style.css";

// Default styles that are needed for the core blocks.
import "@wordpress/block-library/build-style/common.css";
import "@wordpress/block-library/build-style/style.css";
import "@wordpress/block-library/build-style/editor.css";

// Register the default core block types.
registerCoreBlocks();

function Editor() {
  const [blocks, setBlocks] = useState([]);
  return (
    <BlockEditorProvider
      value={blocks}
      onChange={setBlocks}
      onInput={setBlocks}
    >
      <BlockCanvas height="500px" />
    </BlockEditorProvider>
  );
}

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(<Editor />);