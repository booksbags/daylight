from scapy.all import sniff, raw

from utils import catchBag, formatReq, getInterface

from socket import socket

import json

if __name__ == "__main__":
    # interface = getInterface();
    # print("interface", interface)
    # catchBag("WLAN", cb)
    # print(ifaceMap())
    s = socket()
    s.connect(("192.168.1.3", 65530))
    interface = getInterface()
    interfaceName = interface.keys()
    print(interfaceName)
    s.send(formatReq("if", list(interfaceName)))
    res = json.loads(s.recv(1024))
    def cb(bag):
        s.send(raw(bag))
    if res["type"] == "if":
        catchBag(res["value"], cb)


