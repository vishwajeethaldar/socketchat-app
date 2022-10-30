"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpserver = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpserver);
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});
io.on("connection", (socket) => {
    console.log(" A user Connected");
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on("chat message", (message) => {
        console.log(message);
        io.emit("chat message", message);
    });
});
httpserver.listen(process.env.PORT, () => {
    console.log("Connection SuccessFull", process.env.PORT);
});
