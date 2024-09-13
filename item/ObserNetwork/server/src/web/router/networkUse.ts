import { router } from "./router";
import { Observer } from "../../observer/observer";
import { responseMsg } from "../utils";

router.add("/networkUse", {
    "GET":(socket, data)=>{
        const entries = Observer.observerList.entries();
        const result:Record<string, any> = {};
        for (const ele of entries) {
            result[ele[0]] = {
                interface:ele[1].interface,
                status:ele[1].status
            };
        }
        const head:Map<string, string> = new Map();
        head.set("content-type", "application/json;")
        const resData = JSON.stringify(result);
        socket.write(responseMsg(resData, head));
    }
});