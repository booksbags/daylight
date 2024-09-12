from scapy.all import get_if_list, sniff, get_if_addr, get_if_hwaddr
import psutil
import json

def getPsutilInterface():
    return psutil.net_if_addrs()


def getInterface():
    return getPsutilInterface()

def catchBag(ifName:str, prn,filter:str=None):
    print("name is ", ifName)
    sniff(iface=ifName, filter=filter, prn=prn)

def formatReq(type:str, value:any):
    return json.dumps({
        "type":type,
        "value":value
    }).encode("utf-8");
