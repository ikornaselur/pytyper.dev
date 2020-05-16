import React, {useState, useEffect} from 'react';

import AceEditor, {IAnnotation} from 'react-ace';
import {getTypeDefinitions} from 'dict-typer';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

import './App.css';

const THEME: string = 'github';

const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [annotations, setAnnotations] = useState([] as IAnnotation[]);

  useEffect(() => {
    if (input.length > 0) {
      try {
        const typed = getTypeDefinitions(input);
        setAnnotations([]);
        setOutput(typed);
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
      }
    } else {
      setAnnotations([]);
    }
  }, [input]);

  return (
    <>
      <div className="header">
        <h1>Convert JSON to Python type definitions</h1>
      </div>
      <div className="editors">
        <AceEditor
          placeholder="Add JSON"
          height="calc(100vh - 50px)"
          width="50vw"
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
          }}
        />
        <AceEditor
          mode="python"
          theme={THEME}
          height="calc(100vh - 50px)"
          width="50vw"
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
          }}
        />
      </div>
    </>
  );
};

export default App;
