import { runMysql } from "../../database";
import { getSignFromSocket } from "../utils";
import { router } from "./router";
let preDataSign:string|null = null;
let addData = "";
router.set("msg", (socket, value)=>{
    const sign = getSignFromSocket(socket);
    const timestamp = Date.now().toString();
    const dataSign = sign+timestamp;
    if(preDataSign == null){
        preDataSign = dataSign;
    }
    if(dataSign === preDataSign){
        addData += value+";";
    }else{
        preDataSign = dataSign;
        runMysql(`insert into net_info(sign, time, content) values("${sign}", "${timestamp}", "${addData}")`);
        addData = value + ";"
    }

})