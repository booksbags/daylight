import net from "node:net";
import { NetHandle } from "../type/common";
class F{
    constructor(){
        const methods = ["get", "post"];
        for (const method of methods) {
            this[method] = (()=>{
                const store: Map<string, NetHandle> = new Map();
                return (path, handle)=>{
                    store.set(path, handle);
                }
            })();
        }
    }
}
/**
 * 对netServer进行扩展，添加post,get,等方法
 */
export function extendsNetServer(server:net.Server){
    F.prototype = Object.getPrototypeOf(server);
    Object.setPrototypeOf(server, new F());
}