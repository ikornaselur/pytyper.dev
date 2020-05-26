import React from 'react';

import {createStyles, Theme, useTheme, makeStyles} from '@material-ui/core/styles';
import {
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Hidden,
  IconButton,
  Switch,
} from '@material-ui/core';
import {Close} from '@material-ui/icons';

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
    closeMenuButton: {
      marginRight: 'auto',
      marginLeft: 0,
    },
    options: {
      padding: '16px 8px 0 8px',
    },
  }),
);

type SidebarProps = {
  open: boolean;
  toggle: () => void;
  showImports: boolean;
  toggleShowImports: () => void;
  forceAlternative: boolean;
  toggleForceAlternative: () => void;
};

const Sidebar = ({
  open,
  toggle,
  showImports,
  toggleShowImports,
  forceAlternative,
  toggleForceAlternative,
}: SidebarProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const sidebarContent = (
    <div>
      <FormControl className={classes.options}>
        <FormLabel component="legend" focused={false}>
          Options
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={showImports} onClick={toggleShowImports} />}
            label="Show Imports"
          />
          <FormControlLabel
            control={<Switch checked={forceAlternative} onChange={toggleForceAlternative} />}
            label="Alternative"
          />
        </FormGroup>
      </FormControl>
    </div>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={open}
          onClose={toggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <IconButton onClick={toggle} className={classes.closeMenuButton}>
            <Close />
          </IconButton>
          {sidebarContent}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          {sidebarContent}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default Sidebar;
