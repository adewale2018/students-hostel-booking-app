import 'dotenv/config'

import express, { Request, Response } from 'express'

import cors from 'cors'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.get('/api/v1/test', async (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the HOTEL BOOKING APP API!!!'
  })
})

//username saheedadewaleshittu password: gIsR2MMsQERoCWCx (MongoDB)

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`The HOTEL BOOKING APP is running @ ${PORT}`)
});