"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const server = (0, node_http_1.createServer)((req, res) => {
    res.end('Hello World');
});
server.listen(3001);
