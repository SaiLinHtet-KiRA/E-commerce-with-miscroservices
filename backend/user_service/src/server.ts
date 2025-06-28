// import connectDB from "./config/ConnectDB";
import { config } from "dotenv";
config();
import pool from "./config/DB";
import { ExpressServer } from "./server/express";
// import MessageBroker from "./server/MessageBroker";

import "../src/util/passport";
import { rabbitMQ } from "./util/message-broker";
import { USER_RPCQUEUE_NAME } from "./config";
import UserService from "./service/user.service";
import { userService } from "./service";

const expressServer = new ExpressServer();

async function startServer() {
  // await pool.query("DROP TABLE users");
  // await pool.query(" CREATE TYPE Role AS ENUM ('admin', 'user');");
  await pool.query(
    "CREATE TABLE IF NOT EXISTS users ( \
     id SERIAL PRIMARY KEY, \
     username VARCHAR(80) NOT NULL, \
    email VARCHAR(100) UNIQUE NOT NULL , \
     password TEXT,\
     phone VARCHAR(12) UNIQUE, \
     avator TEXT,\
     payment VARCHAR(20),\
     state VARCHAR(20),\
     address VARCHAR(20),\
     road VARCHAR(20),\
     orders VARCHAR(20),\
     carts VARCHAR(20), \
    role Role DEFAULT  'user',\
     createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP \
   );"
  );
  expressServer.startServer();
  rabbitMQ.RPCObserver(USER_RPCQUEUE_NAME, userService);
  // const Rpc = new MessageBroker();
  // Rpc.RPCObserver("scoketServer", new ReviewService());
}
startServer();
