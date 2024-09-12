import threading
from scapy.all import get_if_list, sniff,get_if_addr, get_if_hwaddr
import psutil
import json

def getPsutilInterface():
    return psutil.net_if_addrs()


def getInterface():
    return getPsutilInterface()

def catchBag(ifName:str, prn, stop,filter:str=None):
    sniff(iface=ifName, filter=filter, prn=prn, stop_filter=stop)

def formatReq(type:str, value:any):
    return json.dumps({
        "type":type,
        "value":value
    }).encode("utf-8");

class MyThread(threading.Thread):
    def __init__(self, threadId, name, fn):
        threading.Thread.__init__(self)
        self.threadId = threadId
        self.name = name
        self.fn = fn

    def run(self):
        self.fn()
