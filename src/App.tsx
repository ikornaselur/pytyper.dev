import React, {useState} from 'react';

import {createStyles, Theme, useTheme, makeStyles} from '@material-ui/core/styles';
import {AppBar, CssBaseline, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

import Editors from './Editors';
import Sidebar from './Sidebar';
import {drawerWidth} from './constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
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
      flexGrow: 1,
      width: `calc(100vw - ${drawerWidth}px)`,
      [theme.breakpoints.up('sm')]: {
        height: `calc(100vh - 64px)`,
      },
      [theme.breakpoints.down('xs')]: {
        height: `calc(100vh - 56px)`,
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
  console.log(theme);
  const classes = useStyles(theme);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
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
      <Sidebar open={mobileOpen} toggle={handleDrawerToggle} />
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <Editors />
      </div>
    </div>
  );
};

export default App;
