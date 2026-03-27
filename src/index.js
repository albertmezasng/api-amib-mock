import express, { json } from 'express';
import cors from 'cors';
import { config } from "dotenv";

import userRouter from './user.js';
import institutionRouter from './institutions.js';
import businessLine from './businessLine.js';
import recordRouter from './record.js';
import productRouter from './product.js';
import closeAplicationsDays from './closeAplicationsDays.js';
import examRouter from './exam.js';


import { connectDB } from './database.js';

config();
connectDB();

const app = express();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.json({message: "Express + TypeScript Server"});
});

app.use('/iam/user', userRouter);
app.use('/iam/institution', institutionRouter);
app.use('/iam/business-line', businessLine);

app.use('/record', recordRouter);
app.use('/product', productRouter);
app.use('/exam', examRouter);
app.use('/planning/close-aplication',  closeAplicationsDays);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
