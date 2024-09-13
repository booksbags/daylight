import net from "node:net"
import { Observer } from "../observer/observer";
import { router } from "./router";
/**
 * socket 的通讯协议格式为
 * {
 *  type:xx,
 *  value:xxx
 * }
 */
// socket通信逻辑,d必然是json格式的字符串
export function socketLogic(socket: net.Socket, d: string) {
    function handle(d:string) {
        console.log("socket d is", d);
        const data = JSON.parse(d);
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
    d.split("{").slice(1).forEach((item)=>{
        handle("{"+item);
    })
}