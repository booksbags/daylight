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
        communication.send({
            "type":"msg",
            "value": raw(sendMsg).hex()
        })

    def ctl(status):
        return status
    
    observer = Observer({
        "prn": prn,
        "ctl": ctl,
    })
    
    def begin(comm, v):
        if v == None:
            return print("未选择网卡")
        observer.start(v)

    communication.start()
    communication.addCommand("begin", begin)
    communication.addCommand("end", lambda:observer.setStatus(True))
    communication.send({
        "type":"if",
        "value": observer.getInstanceNames()
    })
