import psutil
from scapy.all import sniff
from utils import MyThread 

class Observer:
    def __init__(self, config) -> None:
        self.__instance = psutil.net_if_addrs()
        self.__prn = config.get("prn")
        self.__ctl = config.get("ctl")#控制函数，会将status, 和包传入
        self.__filter=config.get("filter")
        self.__status = True#状态为未开始
    
    def getInstanceNames(self):
        return list(self.__instance.keys())
    
    def setStatus(self, status:bool):
        self.__status = status

    def start(self, ifName):
        if(not self.__status):return
        self.__status = False
        print("开始抓包", ifName)
        MyThread(lambda:sniff(
            iface=ifName, 
            prn=self.__prn, 
            stop_filter=lambda x:self.__ctl(self.__status, x), 
            filter=self.__filter
        )).start()
