import { createServer } from "node:http";

import { configuration } from "./app/config.js";
import { app } from "./app/index.js";
import { connect } from "./app/database.js";

const { port } = configuration.server;

//connect to the database
connect();
const server = createServer(app);
// starts a simple http server locally on port 3000
server.listen(port, () => {
  console.log(`Server runnig at port ${port}`);
});
