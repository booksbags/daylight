from scapy.all import TCP, sr1, IP, sendp, send

dport = 8092;
sport=8081;

connectReq = IP(dst="192.168.1.4")/TCP(flags="S", seq=1, dport=dport, sport=sport);

reqRes = sr1(connectReq)

print(reqRes[TCP].show())

connectRes = IP(dst="192.168.1.4")/TCP(seq=2, ack=reqRes[TCP].seq + 1, flags="A", dport=dport, sport=sport, window=0);

res = sr1(connectRes)

print(res[TCP].show())

finisReq = IP(dst="192.168.1.4")/TCP(seq=2, ack=reqRes[TCP].seq + 1, flags="A", dport=dport, sport=sport, window=0);