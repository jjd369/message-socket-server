import httpServer from "./src/config/server";
import { connectMongoDb } from "./src/config/db";
import "./src/utils/socket"

connectMongoDb().catch(err => console.log(err));

httpServer.listen(3333, () => {
  console.log("server is running on port 3333s");
});
