import axios from "axios";
import { IFlickrPublicFeed } from "../models/flickr/publicFeed";

const FLICKR_FEED_URL = "https://www.flickr.com/services/feeds/photos_public.gne"

export async function getFlickrPublicFeed(tags?: string): Promise<IFlickrPublicFeed> {
  const feedResp = await axios.get<IFlickrPublicFeed>(`${FLICKR_FEED_URL}`, {
    params: {
      format: 'json',
      nojsoncallback: 1,
      tags
    }
  })

  return feedResp.data
}