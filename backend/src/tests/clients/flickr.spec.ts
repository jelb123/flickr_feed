import Joi from "joi";
import { join } from "path";
import request from "supertest";
import { getFlickrPublicFeed } from "../../clients/flickr"

const schema = Joi.object({
  title: Joi.string().allow('').required(),
	link: Joi.string().required(),
	description: Joi.string().allow('').required(),
	modified: Joi.string().required(),
  generator: Joi.string().allow('').required(),
  items: Joi.array().items(
    Joi.object({
      title: Joi.string().allow('').required(),
      link: Joi.string().required(),
      media: Joi.object({
        m: Joi.string().required(),
      }),
      date_taken: Joi.string().required(),
      description: Joi.string().allow('').required(),
      published: Joi.string().required(),
      author: Joi.string().required(),
      author_id: Joi.string().required(),
      tags: Joi.string().allow('').required(),
    })
  )
})

describe("Test the getFlickrPublicFeed client function", () => {
  test('It should be defined', () => {
    expect(getFlickrPublicFeed).toBeDefined();
  })

  test("It should return an object", async () => {
    const data = await getFlickrPublicFeed();
    expect(typeof data === 'object' && data !== null).toBe(true);
  });

  test("It should return an object matching correct schema", async () => {
    const data = await getFlickrPublicFeed();
    const {error} = schema.validate(data)
    expect(error).toBeUndefined()
  });

  test("It should accept search tags", async () => {
    const data = await getFlickrPublicFeed("test");
    const {error} = schema.validate(data)
    expect(error).toBeUndefined()
  });
});

