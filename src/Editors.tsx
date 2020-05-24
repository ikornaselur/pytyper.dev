import React, {useState, useEffect} from 'react';

import AceEditor, {IAnnotation} from 'react-ace';
import {getTypeDefinitions} from 'dict-typer';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

import styles from './Editors.module.css';

const THEME: string = 'github';

const EXAMPLE: string = `{
  "number_int": 123,
  "number_float": 3.0,
  "string": "string",
  "list_single_type": ["a", "b", "c"],
  "list_mixed_type": ["1", 2, 3.0],
  "optional_type": [1, null],
  "nested_dict": {
    "number": 1,
    "string": "value",
    "maybe": "foo"
  },
  "same_nested_dict": {
    "number": 2,
    "string": "different value",
    "maybe": null
  },
  "multipe_levels": {
    "level2": {
      "number": 2,
      "string": "more values",
      "maybe": null
    }
  },
  "nested_invalid": { "numeric-id": 123, "from": "far away" },
  "optional_items": [1, 2, "3", "4", null, 5, 6, null]
}`;

const Editors = () => {
  const [input, setInput] = useState(EXAMPLE);
  const [output, setOutput] = useState('');
  const [validJson, setValidJson] = useState(true);
  const [annotations, setAnnotations] = useState([] as IAnnotation[]);

  useEffect(() => {
    if (input.length > 0) {
      try {
        const typed = getTypeDefinitions(input);
        setAnnotations([]);
        setOutput(typed);
        setValidJson(true);
      } catch (e) {
        const message = e.message;
        const matches = message.match(/position (\d+)/);

        let row;
        if (matches) {
          const position = parseInt(matches[1]);
          const rows = input.substring(0, position).split(/\r\n|\r|\n/);
          row = rows.length - 1;
        } else {
          row = 0;
        }

        setAnnotations([{row: row, column: 0, text: message, type: 'error'}]);
        setValidJson(false);
      }
    } else {
      setAnnotations([]);
      setValidJson(true);
    }
  }, [input]);

  return (
    <div className={styles.root}>
      <div className={validJson ? '' : styles.error}>
        <AceEditor
          width=""
          height=""
          placeholder="Add JSON"
          className={styles.editor}
          annotations={annotations}
          mode="json"
          theme={THEME}
          name="aceInput"
          onChange={value => setInput(value)}
          fontSize={16}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={input}
          setOptions={{
            showLineNumbers: true,
            tabSize: 2,
            useWorker: false,
          }}
        />
      </div>
      <div>
        <AceEditor
          width=""
          height=""
          className={styles.editor}
          mode="python"
          theme={THEME}
          name="aceOutput"
          fontSize={16}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={false}
          readOnly={true}
          value={output}
          setOptions={{
            showLineNumbers: true,
            tabSize: 2,
            useWorker: false,
          }}
        />
      </div>
    </div>
  );
};

export default Editors;
