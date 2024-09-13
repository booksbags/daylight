export function returnMsgType(msg:string){
    if(msg.startsWith("{")){
        return "json";
    }else{
        return "html"
    }
}