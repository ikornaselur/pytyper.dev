import React, {useState, useEffect} from 'react';

import AceEditor, {IAnnotation} from 'react-ace';
import {getTypeDefinitions} from 'dict-typer';
import {createStyles, Theme, useTheme, makeStyles} from '@material-ui/core/styles';
import className from 'classnames';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

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
    editor: {
      borderBottom: `1px solid ${theme.palette.primary.dark}`,
      height: '100%',
      width: '100%',
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
  setInput: React.Dispatch<React.SetStateAction<string>>;
  validJson: boolean;
  setValidJson: React.Dispatch<React.SetStateAction<boolean>>;
};

const Editors = ({
  showImports,
  forceAlternative,
  input,
  setInput,
  validJson,
  setValidJson,
}: EditorProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [output, setOutput] = useState('');
  const [annotations, setAnnotations] = useState([] as IAnnotation[]);

  useEffect(() => {
    if (input.length > 0) {
      try {
        const typed = getTypeDefinitions(input, {showImports, forceAlternative});
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
  }, [input, forceAlternative, showImports]);

  return (
    <div className={classes.root}>
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
      <AceEditor
        width=""
        height=""
        className={classes.editor}
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
          tabSize: 4,
          useWorker: false,
        }}
      />
    </div>
  );
};

export default Editors;
