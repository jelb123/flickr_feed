import React from 'react';
import { Grid, GridList } from '@material-ui/core';
import { ImageTile, ImageTileProps } from './ImageTile';

interface ImageTileListProps {
  tiles: ImageTileProps[]
}

export function ImageTileList ({
  tiles
}: ImageTileListProps) {
  return (
    <Grid container justify="space-around">
      <GridList cellHeight={180} cols={2} >
        {tiles.map(tile => (
          <ImageTile
            key={tile.imageUrl}
            imageUrl={tile.imageUrl}
            title={tile.title}
            author={tile.author}
            published={tile.published}
          />
        ))}
      </GridList>
    </Grid>
  )
}