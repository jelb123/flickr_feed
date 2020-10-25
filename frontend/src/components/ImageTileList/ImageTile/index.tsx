import { GridListTile, GridListTileBar } from '@material-ui/core'
import React from 'react'

export interface ImageTileProps {
  imageUrl: string;
  title?: string;
  author?: string;
  published?: string;
}

export function ImageTile({ imageUrl, title, author, published, ...rest }: ImageTileProps) {
  return (
    <GridListTile key={imageUrl} {...rest} >
      <img src={imageUrl} alt={title}/>
      <GridListTileBar
        title={title}
        subtitle={(
          <>
            <div>by: {author}</div>
            <div>published: {published}</div>
          </>
        )}
      />
    </GridListTile>
  )
}