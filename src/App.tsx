import React, {useState} from 'react';

import {createStyles, Theme, useTheme, makeStyles} from '@material-ui/core/styles';
import {AppBar, Container, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

import Editors from './Editors';
import Sidebar from './Sidebar';
import {drawerWidth} from './constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100vh',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      paddingTop: 56,
      [theme.breakpoints.up('sm')]: {
        paddingTop: 64,
      },
    },
    closeMenuButton: {
      marginRight: 'auto',
      marginLeft: 0,
    },
  }),
);

const App = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showImports, setShowImports] = useState(true);
  const [forceAlternative, setForceAlternative] = useState(false);
  const [input, setInput] = useState(EXAMPLE);
  const [validJson, setValidJson] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            pytyper: convert JSON to Python type definitions
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar
        open={mobileOpen}
        toggle={handleDrawerToggle}
        showImports={showImports}
        toggleShowImports={() => {
          setShowImports(!showImports);
        }}
        forceAlternative={forceAlternative}
        toggleForceAlternative={() => {
          setForceAlternative(!forceAlternative);
        }}
        validJson={validJson}
        prettify={() => {
          setInput(JSON.stringify(JSON.parse(input), null, 2));
        }}
      />
      <Container disableGutters={true} className={classes.content}>
        <Editors
          showImports={showImports}
          forceAlternative={forceAlternative}
          input={input}
          setInput={setInput}
          validJson={validJson}
          setValidJson={setValidJson}
        />
      </Container>
    </div>
  );
};

export default App;

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
  "nested_invalid": {"numeric-id": 123, "from": "far away"},
  "optional_items": [1, 2, "3", "4", null, 5, 6, null]
}`;
