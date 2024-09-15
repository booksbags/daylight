import json
from communication import Communication
from observer import Observer
from scapy.all import raw

if __name__ == "__main__":

    communication = Communication("192.168.1.3", 65530)
    def prn(bag):
        try:
            sendMsg = bag["IP"]
        except:
            return;
        data = raw(sendMsg).hex()
        communication.send({
            "type":"msg",
            "length":data.__len__(),
            "value": data,
        })

    def ctl(status, bag):
        return status
    
    observer = Observer({
        "prn": prn,
        "ctl": ctl,
    })
    
    def end():
        print("结束抓包")
        observer.setStatus(True)

    def begin(comm, v):
        if v == None:
            return print("未选择网卡")
        observer.start(v)
    
    def onConnect(communication):
        print("连接成功")
        communication.send({
            "type":"if",
            "value": observer.getInstanceNames()
        })

    communication.onConnectionReset = end
    communication.onConnect = onConnect
    communication.start()
    communication.addCommand("begin", begin)
    communication.addCommand("end", end)
