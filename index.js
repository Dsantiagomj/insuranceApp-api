import { createServer } from "node:http";

import { configuration } from "./app/config.js";

const { port } = configuration.server

const hostname = "127.0.0.1";

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World!\n");
});
// starts a simple http server locally on port 3000
server.listen(port, hostname, () => {
  console.log(`Server runnig at http://${hostname}:${port}/`);
});
