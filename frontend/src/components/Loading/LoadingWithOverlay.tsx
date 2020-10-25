import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Backdrop,
  CircularProgress,
  CircularProgressProps,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles({
  backdrop: {
    zIndex: 1,
    color: "#fff",
    position: "absolute",
    borderRadius: "6px",
  },
});

interface ITransitionDuration {
  appear?: number;
  enter?: number;
  exit?: number;
}

interface IProps {
  transitionDuration?: number | ITransitionDuration;
  open?: boolean;
  circularProgressProps?: CircularProgressProps;
}
export default function LoadingWithOverlay({
  open = false,
  transitionDuration,
  circularProgressProps,
}: IProps) {
  const classes = useStyles();

  return (
    <div>
      <Backdrop
        classes={{ root: classes.backdrop }}
        open={open}
        transitionDuration={transitionDuration}
      >
        <Grid container alignItems="center" justify="center" direction="column">
          <Grid item>
            <CircularProgress {...circularProgressProps} />
          </Grid>
        </Grid>
      </Backdrop>
    </div>
  );
}
