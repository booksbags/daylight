import { runMysql } from "../../database";
import { responseMsg } from "../utils";
import { router } from "./router";

router.add("/networkDetail", {
    "GET":(socket, v)=>{
        const params = v.params;
        const sign = params.get("sign");
        if(sign == undefined)socket.write("无效的sign");
        runMysql(`select * from net_info where sign="${sign}" limit 20`).then((data)=>{
            socket.write(responseMsg(JSON.stringify(data)))
        })
    }
})