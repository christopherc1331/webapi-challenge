const express = require("express"),
  helmet = require("helmet");
// dev imports //

const actionServer = require("./Servers/actionServer.js"),
  projectsServer = require("./Servers/projectsServer.js");

// file imports //

const server = express();

server.use(helmet());
server.use("/api/actions", actionServer);
server.use("/api/projects", projectsServer);

server.get("/", (req, res) => res.send(`<h2>Sanity Check!</h2>`));

module.exports = server;
