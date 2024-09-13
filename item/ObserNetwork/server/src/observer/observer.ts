import net from "node:net"
/**
 * 维护流量监听器的数据
 */
export class OriginalObserver{
    private _ip:string;// ip
    private _port:number;// 端口
    private _interface:string[];// 可以使用的网卡
    private _status:null|string;//null表示没有监听，字符串为网卡名称
    private _socket:net.Socket;//与其通讯的socket
    constructor(ip:string, port:number, ins:string[], status:null|string, socket:net.Socket){
        this._ip = ip;
        this._port = port;
        this._interface = ins;
        this._status = status;
        this._socket = socket;
    }
    set interface(v:string[]){
        this._interface = v;
    }
    get interface(){
        return this._interface;
    }
    get status(){
        return this._status
    }
    set status(v:null|string){
        this._status = v;
    }
    get socket(){
        return this._socket
    }
}

export class Observer extends OriginalObserver{
    static observerList:Map<string, OriginalObserver> = new Map();
    constructor(ip:string, port:number, ins:string[], status:null|string, socket:net.Socket){
        const sign = `${ip}:${port}`;
        if(Observer.observerList.has(sign)){
            return Observer.observerList.get(sign)!;
        }
        super(ip, port, ins, status, socket);
        Observer.observerList.set(sign, this);
    }
}