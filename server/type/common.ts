import { analyzeReqMsg } from "../utils/analyzeReqMsg"
import net from "node:net"
import { RecordWithUndefined } from "./utils";
type RequestType = "GET"|"POST"|"PUT"|"DELETE"|"HEAD"|"OPTIONS"
type NetHandle = (path:string, handle:(req: ReturnType<typeof analyzeReqMsg>, res:unknown)=>void)=>void;
type ExtendNetServer = RecordWithUndefined<Lowercase<RequestType>, NetHandle> & net.Server;
export type {
    RequestType,
    ExtendNetServer,
    NetHandle
}