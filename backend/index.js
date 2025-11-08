const app = require("./app");
const http = require("http");
const socketSetup = require("./socket");
const config = require("./config/config");

const PORT = config.app.port;

const server = http.createServer(app);
socketSetup(server); // Initialize Socket.io

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
