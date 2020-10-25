import Joi from "joi";
import request from "supertest";
import app from "../app"

const returnedImagesSchema = Joi.array().items(Joi.object({
  title: Joi.string().allow('').required(),
  imageUrl: Joi.string().required(),
  published: Joi.string().required(),
  author: Joi.string().allow('').required(),
}))

describe("Test the root path", () => {
  test("It should return 200 OK to the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});

describe("Test the /images path", () => {
  test("It should return 200 OK to the GET method", async () => {
    const response = await request(app).get("/images");
    expect(response.status).toBe(200);
  });

  test("It should return 200 OK to the GET method with query", async () => {
    const response = await request(app).get("/images?q=test")
    expect(response.status).toBe(200)
  })

  test("It should return 400 BAD REQUEST to a GET request with multiple queries", async () => {
    const response = await request(app).get("/images?q=test&q=testt2")
    expect(response.status).toBe(400)
  })

  test("It should return an array from the GET request", async () => {
    const response = await request(app).get("/images")
    expect(Array.isArray(response.body)).toBe(true)
  })
  
  test("It should return an array of items that match correct schema from GET method", async () => {
    const response = await request(app).get("/images")
    const {error} = returnedImagesSchema.validate(response.body)
    expect(error).toBeUndefined()
  })
});

describe("Test fake /blah path", () => {
  test("It should return 404 NOT FOUND to the GET method", async () => {
    const response = await request(app).get("/blah");
    expect(response.status).toBe(404);
  });
});