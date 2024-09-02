import socket

s = socket.socket()

s.bind(("192.168.1.3", 8088))

s.listen(3)

while True:
    print("等待连接")
    c, addr = s.accept()
    print("who accept me", addr)