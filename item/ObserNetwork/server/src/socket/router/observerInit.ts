import { router } from "./router";
import { Observer } from "../../observer/observer";
import { getSignFromSocket } from "../utils";

router.set("if", (socket, v)=>{
    const sign = getSignFromSocket(socket);
    const observer = Observer.observerList.get(sign);
    if(observer === undefined)throw new Error("错误的逻辑");
    console.log(v)
    observer.interface = v;
});