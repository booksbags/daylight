import socket

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

s.sendto(b"hello", ("192.168.1.3", 41234))