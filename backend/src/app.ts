import express from 'express';
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import { getImages, validateGetImagesQuery } from './controllers/images';

const app = express();

app.use(cors())
app.use(helmet())
app.use(compression())

app.get('/', (req,res) => res.send('Express Server'));
app.get('/images', validateGetImagesQuery, getImages)

export default app