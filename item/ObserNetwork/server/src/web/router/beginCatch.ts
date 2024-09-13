import { Observer } from "../../observer/observer";
import { res } from "../../socket/utils";
import { router } from "./router";

router.add("/beginCatch", {
    "POST":(socket, data)=>{
        const {interface:ins, target} = JSON.parse(data.requestBody);
        console.log(ins, target)
        const targetSocket = Observer.observerList.get(target);
        if(targetSocket){
            targetSocket.socket.write(res("begin",ins))
        }
    }
})