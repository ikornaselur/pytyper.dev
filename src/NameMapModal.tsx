import React, {useState} from 'react';

import {createStyles, Theme, useTheme, makeStyles} from '@material-ui/core/styles';
import {FindReplace} from '@material-ui/icons';
import {Button, Modal} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      position: 'absolute',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.up('sm')]: {
        width: 600,
      },
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      outline: 0,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    button: {
      backgroundColor: theme.palette.secondary.light,
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
      },
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    wrapper: {
      position: 'relative',
    },
    buttonProgress: {
      position: 'absolute',
      color: theme.palette.secondary.main,
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

const NameMapModal = (): JSX.Element => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [open, setOpen] = useState(false);

  const onClosePress = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<FindReplace />}
        className={classes.button}
        fullWidth
        onClick={() => setOpen(true)}
      >
        Rename classes
      </Button>
      <Modal open={open} onClose={onClosePress}>
        <div className={classes.modal}>
          <h2 id="simple-modal-title">Rename classes in the output</h2>
          <p id="simple-modal-description">
            pytyper tries to name the generated classes based on the JSON input, but sometimes the
            result isn't as nice as it could be. For simple renames it's likely easiest just to
            rename it as you use the output, but for larger outputs it might be easier to provide a
            map of class names to rename automatically in the output. If you for example add "Root:
            Source" to the name map, then the root dictionary in the output will be names "Source"
            instead of "Root".
          </p>
        </div>
      </Modal>
    </>
  );
};

export default NameMapModal;
