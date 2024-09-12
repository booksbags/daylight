from scapy.all import raw

from utils import MyThread, catchBag, formatReq, getInterface

from socket import socket

import json

if __name__ == "__main__":
    s = socket()
    s.connect(("192.168.1.3", 65530))
    interface = getInterface()
    interfaceName = interface.keys()
    s.send(formatReq("if", list(interfaceName)))
    res = json.loads(s.recv(1024))
    close = False
    def cb(bag):
        try:
            sendBag = bag["IP"]
        except:
            return
        print("发送报文")
        s.send(formatReq("bag", raw(bag["IP"]).hex()))

    def beginCatch():
        if res["type"] == "if":
            print("开始抓包")
            catchBag(res["value"], cb, lambda x:close)
    def listen():
        global close
        while True:
            res = json.loads(s.recv(1024))
            if res["type"] == "end":
                print("结束")
                close = True
            if res["type"] == "begin":
                print("重新开始")
                close = False
                MyThread(1, "begin", lambda :catchBag(res["value"], cb, lambda x:close)).start()
    MyThread(1, "begin", beginCatch).start()
    MyThread(2, "server", listen).start()

