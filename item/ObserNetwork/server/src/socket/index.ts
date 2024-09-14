import net from "node:net"
import { Observer } from "../observer/observer";
import { router } from "./router";
import process from "process"
/**
 * socket 的通讯协议格式为
 * {
 *  type:xx,
 *  value:xxx
 * }
 */
let enouth = true;
let msg:Record<string, any> = {};
// socket通信逻辑,d必然是json格式的字符串
export function socketLogic(socket: net.Socket, d: string) {
    function handle(d:string, fullData:string) {
        let data:Record<string, any> = msg;
        if(!enouth){
            data.value = data.value + d.substring(0, d.length - 2);
        }else{
            data = JSON.parse(d);
        }
        console.log(data.length, Buffer.from(data.value).length)
        if(Buffer.from(data.value).length > data.length){
            process.exit()
        }
        if(data.length !== undefined && data.length != Buffer.from(data.value).length){
            enouth = false;
            msg = data;
            return;
        }else{
            enouth = true;
            msg = {}
        }
        const ip = socket.remoteAddress;
        const port = socket.remotePort;
        new Observer(ip ?? "", port ?? 0, [], null, socket);
        const handle = router.get(data["type"]);
        if (handle) {
            handle(socket, data["value"]);
        } else {
            console.log("未处理的type", data);
        }
    }
    d.split("}").forEach((item)=>{
        if(item === "")return;
        if(["\"", "]", "}", " "].includes(item[item.length-1])){
            handle(item+"}", d);
        }else{
            handle(item+"\"}", d)
        }
    })
}