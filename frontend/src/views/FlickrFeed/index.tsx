import { Grid, makeStyles, TextField } from '@material-ui/core';
import axios, { CancelTokenSource } from 'axios';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react'

import { ImageTileList } from '../../components/ImageTileList'
import LoadingWithOverlay from '../../components/Loading/LoadingWithOverlay';

interface IFlickrFeed {
  title: string;
  imageUrl: string;
  published: string;
  author: string;
}

const useStyles = makeStyles({
  fullWidth: {
    width: "100%"
  },
  scrollContainer: {
    overflowY: "scroll",
  },
  root: {
    maxHeight: "95%",
    width: "500px"
  }
})


export function FlickrFeedView() {
  const classes = useStyles()
  const [searchVal, setSearchVal] = useState<string>("")

  const [feedArr, setFeedArr] = useState<IFlickrFeed[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  let cancelToken = useRef<CancelTokenSource>();

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchVal(event.target.value)

    loadFlickrFeed(searchVal)
  }

  async function loadFlickrFeed(q?: string, ) {
    setLoading(true)
    
    if (cancelToken.current) {
      cancelToken.current.cancel("API call canceled due to new request.");
      cancelToken.current = undefined
    }

    cancelToken.current = axios.CancelToken.source();
    try {
      const imagesResp = await axios.get<IFlickrFeed[]>(
        "http://localhost:3001/images", 
        {
          params: {
            q
          },
          cancelToken: cancelToken.current.token
        }
      )
      const newFeedArr = [...imagesResp.data]
      setFeedArr(newFeedArr)
    } catch(err) {
      if (!(err instanceof axios.Cancel)) {
        console.error(err)
      }
      // TODO: Do something to display error status
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    loadFlickrFeed()
  }, [])

  return (
    <Grid 
      container 
      direction="column" 
      justify="center" 
      alignItems="center"
      className={clsx(classes.fullWidth, classes.root)}
      wrap="nowrap" 
    >
      <Grid item className={classes.fullWidth} >
        <TextField 
          id="flickr-tags-query" 
          fullWidth 
          margin="normal" 
          label="Search by Tag" 
          value={searchVal} 
          onChange={handleSearchChange}
        />
      </Grid>
      <Grid item className={classes.scrollContainer}>
        <ImageTileList 
          tiles={feedArr}
        />
        <LoadingWithOverlay open={loading && feedArr.length === 0} />
      </Grid>
    </Grid>
  )
}