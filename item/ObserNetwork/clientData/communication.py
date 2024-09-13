from socket import socket
import json

from utils import MyThread
class Communication:
    def __init__(self, ip:str, port:int, commandDict={}) -> None:
        self.__ip = ip
        self.__port = port
        self.__socket = socket()
        self.__status = False#连接状态
        self.__commandDict = commandDict
    
    def addCommand(self, name, cb):
        self.__commandDict.update(name, cb)

    def recv(self):
        response = json.loads(self.__socket.recv(1024))
        command = self.commandDict.get(response["type"])
        if(not command):
            print("无效指令")
        else:
            command(self, response.get("value"))

    def start(self):
        try:
            self.__socket.connect((self.__ip, self.__port))
        except:
            return print("连接失败")
        print("连接成功")
        MyThread(lambda:self.recv())
    
    def send(self, msg:str|dict):
        if self.__status:
            sendMsg = ""
            if type(msg) == str:
                sendMsg = msg
            elif type(msg) == dict:
                sendMsg = json.dumps(msg)
            else:
                return print("类型错误")
            self.__socket.send(sendMsg)
        else:
            print("请先连接网络")

    