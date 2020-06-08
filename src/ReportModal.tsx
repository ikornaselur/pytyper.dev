import React, {useState} from 'react';

import {createStyles, Theme, useTheme, makeStyles} from '@material-ui/core/styles';
import {ReportProblem} from '@material-ui/icons';
import {Button, ButtonGroup, CircularProgress, Grid, Modal} from '@material-ui/core';

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
      backgroundColor: theme.palette.error.light,
      '&:hover': {
        backgroundColor: theme.palette.error.main,
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

type Props = {
  submitReport: () => Promise<void>;
};

const ReportModal = ({submitReport}: Props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onClosePress = () => {
    setOpen(false);
    setPending(false);
    setSubmitted(false);
  };

  const onReportPress = async () => {
    setPending(true);
    await submitReport();
    setSubmitted(true);
    setPending(false);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<ReportProblem />}
        className={classes.button}
        fullWidth
        onClick={() => setOpen(true)}
      >
        Report error
      </Button>
      <Modal open={open} onClose={onClosePress}>
        <div className={classes.modal}>
          <h2 id="simple-modal-title">Report error in conversion</h2>
          <p id="simple-modal-description">
            {submitted
              ? 'Report has been submitted'
              : 'If the current conversion is incorrect, you can report it for further inspection. Note that raw JSON input and the Python output are sent as is with the report, feel free to edit the input content if it contains anything sensitive.'}
          </p>
          <Grid container direction="row" justify="flex-end" alignItems="center">
            {submitted ? (
              <Button variant="contained" color="secondary" onClick={onClosePress}>
                Close
              </Button>
            ) : (
              <ButtonGroup variant="contained" color="primary">
                <Button disabled={pending} onClick={onClosePress}>
                  Cancel
                </Button>
                <div className={classes.wrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={pending}
                    onClick={onReportPress}
                  >
                    Report
                  </Button>
                  {pending && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
              </ButtonGroup>
            )}
          </Grid>
        </div>
      </Modal>
    </>
  );
};

export default ReportModal;
