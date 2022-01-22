import express from "express";
import { createServer } from "http";
import { config } from "dotenv";
import cors from 'cors';
import routes from "../routes";
// dot env config
config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

const httpServer = createServer(app);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  if (err.statusCode) {
    res.status(err.statusCode).send(err.message);
  }
  res.status(500).send(err.message);
});
export default httpServer;
