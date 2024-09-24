import expess from 'express';
import { connect } from './models/connectdb.js';
import { router } from './routers/indexRouter.js';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io';

connect();
const port = 7000
const app = expess();
app.use(bodyParser.json());
app.use(cors({
  // origin:"http://localhost:3001" in frontend
  origin:"http://localhost:3002",
  credentials :true

}));
// app.use(cors({}));








app.use(cookieParser());
dotenv.config();
router(app)
app.listen(port, () => {
  })