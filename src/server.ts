import express, { Request, Response } from "express"
import { createServer } from "http";
import {Server} from "socket.io"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const httpserver = createServer(app)

const io = new Server(httpserver)




app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", (req:Request, res:Response)=>{
    res.sendFile(`${__dirname}/views/index.html`)
})


io.on("connection", (socket)=>{
    console.log(" A user Connected");

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    
    socket.on("chat message", (message)=>{
        console.log(message);
        io.emit("chat message", message)
    })
})


httpserver.listen(process.env.PORT, ()=>{
    console.log("Connection SuccessFull",process.env.PORT)
})