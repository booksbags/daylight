from socket import socket, gaierror
import json
import time

from utils import MyThread
class Communication:
    def __init__(self, ip:str, port:int, commandDict={}) -> None:
        self.__ip = ip
        self.__port = port
        self.__status = False#连接状态
        self.__commandDict = commandDict
        self.onConnectionReset = lambda:print("服务器断开连接")
        self.onConnect = lambda x:print("连接成功")
    
    def addCommand(self, name, cb):
        self.__commandDict[name] = cb

    def __connect(self):
        try:
            self.__socket.close()
        except:pass
        self.__socket = socket()
        self.__socket.connect((self.__ip, self.__port))
        self.__status = True
        self.onConnect(self)

    def recv(self):
        try:
            originMsg = self.__socket.recv(1024)
            response = json.loads(originMsg)
        except:
            if self.__status == True:
                self.__status = False
                self.onConnectionReset()
            try:
                time.sleep(3)
                self.__connect()
                return
            except ConnectionResetError:
                print("重连失败")
            except gaierror:
                print("服务器为启动")
            except ConnectionRefusedError:
                print("服务器拒绝连接")
            return
        command = self.__commandDict.get(response["type"])
        if(not command):
            print("无效指令")
        else:
            command(self, response.get("value"))

    def start(self):
        try:
           self.__connect()
        except:
            print("连接失败")
        def loopRecv():
            while True:
                self.recv()
        MyThread(loopRecv).start()
    
    def send(self, msg:str|dict):
        if self.__status:
            sendMsg = ""
            if type(msg) == str:
                sendMsg = msg
            elif type(msg) == dict:
                sendMsg = json.dumps(msg)
            else:
                return print("类型错误")
            self.__socket.send(sendMsg.encode("utf-8"))
        else:
            print("请先连接网络")

    