import net from "node:net"
import { analyzeReqMsg } from "./utils"
import { router } from "./router";
let enough = true;
let msg = "";
export function htmlLogic(socket:net.Socket, data:string){
    if(!enough){
        data = msg + data;
    }
    const reqMsg = analyzeReqMsg(data);
    let contentLength = reqMsg.requestHead.has("Content-Length") ? reqMsg.requestHead.get("Content-Length")![0]:0;
    if(contentLength != Buffer.from(reqMsg.requestBody).length){
        enough = false;
        msg = data;
        return;
    }else{
        enough = true;
        msg = ""
    }
    const handle = router.get(reqMsg.requestPath);
    if(handle){
        handle[reqMsg.requestMethod](socket, reqMsg);
    }else{
        console.log("未处理的路径", reqMsg.requestPath);
        socket.write("error");
    }
}