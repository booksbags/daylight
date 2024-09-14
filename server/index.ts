import net from "node:net";
import { createServer } from "./utils/createServer";

const server = createServer();

server.post("/", (req, res)=>{
    
})

server.listen(80, "127.0.0.1",()=>{
    console.log("服务器启动");
});