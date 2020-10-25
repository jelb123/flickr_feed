interface IFlickerItemMedia {
  m: string
}

interface IFlickerPublicFeedItems {
  title: string
  link: string
  media: IFlickerItemMedia
  date_taken: string
  description: string
  published: string
  author: string
  author_id: string
  tags: string
}

export interface IFlickrPublicFeed {
	title: string
	link: string
	description: string
	modified: string
	generator: string
	items: IFlickerPublicFeedItems[]
}

