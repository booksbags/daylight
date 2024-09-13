import { analyzeReqMsg } from "../utils";
import net from "node:net"

type RouterHandle = (socket:net.Socket, data:ReturnType<typeof analyzeReqMsg>)=>void;

class Router{
    private _router:Map<string, Record<string, RouterHandle>> = new Map();
    public add(path:string, handle:Record<string, RouterHandle>){
        this._router.set(path, handle);
    }
    public get(path:string){
        return this._router.get(path);
    }
}

export const router = new Router();
