import React from 'react';

import {createStyles, useTheme, makeStyles} from '@material-ui/core/styles';

import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';

SyntaxHighlighter.registerLanguage('python', python);

const green = 'rgb(30 99 12)';
const purple = 'rgb(176 39 193)';
const red = 'rgb(195 71 67)';
const blue = 'rgb(58 48 218)';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingLeft: '5px',
      '& pre': {
        margin: 0,
      },
      '& span.token.keyword': {
        color: red,
      },
      '& span.token.class-name': {
        color: blue,
      },
      '& span.token.builtin': {
        color: purple,
      },
      '& span.token.string': {
        color: green,
      },
    },
  }),
);

type Props = {
  output: string;
};

const Output = ({output}: Props) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <SyntaxHighlighter
        customStyle={{margin: 0, padding: '0 0.5em', fontSize: '15px'}}
        showLineNumbers
        language="python"
        useInlineStyles={false}
      >
        {output}
      </SyntaxHighlighter>
    </div>
  );
};

export default Output;
