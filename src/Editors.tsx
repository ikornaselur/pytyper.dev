import React, {useState, useEffect} from 'react';

import AceEditor, {IAnnotation} from 'react-ace';
import {getTypeDefinitions} from 'dict-typer';
import {createStyles, Theme, useTheme, makeStyles} from '@material-ui/core/styles';
import className from 'classnames';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

import Output from './Output';

const THEME: string = 'github';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      maxWidth: '1630px',
      width: '100%',
      height: '100%',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    column: {
      width: '100%',
      height: '100%',
    },
    editor: {
      borderBottom: `1px solid ${theme.palette.primary.dark}`,
      height: '100%',
      width: '100%',
    },
    output: {
      whiteSpace: 'pre',
      padding: '10px',
    },
    error: {
      background: theme.palette.error.light,
    },
  }),
);

type EditorProps = {
  showImports: boolean;
  forceAlternative: boolean;
  input: string;
  setInput: (input: string) => void;
  output: string;
  setOutput: (output: string) => void;
};

const Editors = ({
  showImports,
  forceAlternative,
  input,
  setInput,
  output,
  setOutput,
}: EditorProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [validJson, setValidJson] = useState(true);
  const [annotations, setAnnotations] = useState([] as IAnnotation[]);
  const [nameMap, setNameMap] = useState({
    Root: 'Djamm',
    Foo: 'Bar',
  });

  useEffect(() => {
    if (input.length > 0) {
      try {
        const typed = getTypeDefinitions(input, {showImports, forceAlternative, nameMap});
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
  }, [input, nameMap, setOutput, setAnnotations, setValidJson, forceAlternative, showImports]);

  return (
    <div className={classes.root}>
      <div className={classes.column}>
        <AceEditor
          width=""
          height=""
          placeholder="Add JSON"
          className={className(classes.editor, {[classes.error]: !validJson})}
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
      <div className={classes.column}>
        <Output output={output} />
      </div>
    </div>
  );
};

export default Editors;
