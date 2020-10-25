import { Request, Response } from "express";
import { query, validationResult } from 'express-validator'
import { getFlickrPublicFeed } from "../clients/flickr";

export const validateGetImagesQuery = query('q').optional().isString().withMessage('Query field "q" must be a string').trim().optional()

export async function getImages(req: Request, res: Response): Promise<any> {
  try {
    const validatedQueryErrors = validationResult(req).array()
    if (validatedQueryErrors.length) {
      res.status(400).send(validatedQueryErrors.map(err => err.msg))
    } else {
      const tags = req.query.q as string || undefined // We know this is a string of undefined due to validator
  
      const feedData = await getFlickrPublicFeed(tags)
      const feedItems = feedData.items.map(item => ({
        title: item.title,
        imageUrl: item.media.m,
        published: item.published,
        author: item.author,
      }))
  
      res.status(200).send(feedItems)
    }
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: "An unexpected error occurred"})
  }
};