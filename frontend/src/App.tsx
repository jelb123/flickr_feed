import React from 'react';
// import './App.css';
import { FlickrFeedView } from './views/FlickrFeed';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  containerRoot: {
    height: "100vh",
    maxHeight: "100vh",
  },
  itemRoot: {
    height: "100%"
  }
})

function App() {
  const classes = useStyles()
  return (
    <div>
      <Grid container alignItems="center" justify="center" classes={{ root: classes.containerRoot }}>
        <Grid item classes={{ root: classes.itemRoot }}>
          <FlickrFeedView />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
