import React from 'react';

import {createStyles, Theme, useTheme, makeStyles} from '@material-ui/core/styles';
import {Hidden, Drawer, IconButton, List, ListItem, ListItemText} from '@material-ui/core';
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
  }),
);

interface SidebarProps {
  open: boolean;
  toggle: () => void;
}

const Sidebar = ({open, toggle}: SidebarProps) => {
  const dummyCategories = ['Hokusai', 'Hiroshige', 'Utamaro', 'Kuniyoshi', 'Yoshitoshi'];
  const theme = useTheme();
  const classes = useStyles(theme);

  const SidebarContent = () => (
    <div>
      <List>
        {dummyCategories.map(text => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
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
          <SidebarContent />
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
          <SidebarContent />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default Sidebar;
