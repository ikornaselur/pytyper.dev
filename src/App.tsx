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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const submitReport = async (): Promise<void> => {
    console.log('Waiting...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Done!');
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
        submitReport={submitReport}
      />
      <Container disableGutters={true} className={classes.content}>
        <Editors showImports={showImports} forceAlternative={forceAlternative} />
      </Container>
    </div>
  );
};

export default App;
