import socket

s = socket.socket();

s.connect(("192.168.1.4", 8088))

s.close()

