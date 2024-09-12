import * as dgram from "dgram"

// 创建 UDP 服务器
const server = dgram.createSocket("udp4");

// 监听消息事件
server.on('message', (msg, rinfo) => {
    console.log(`服务器收到: ${msg} 来自 ${rinfo.address}:${rinfo.port}`);

    // 可选：发送响应给客户端
    const responseMessage = `服务器已收到: ${msg}`;
    console.log(responseMessage)
    // server.send(responseMessage, rinfo.port, rinfo.address, (err) => {
    //     if (err) {
    //         console.error('发送消息时出错:', err);
    //     } else {
    //         console.log('响应已发送');
    //     }
    // });
});

// 处理服务器绑定时的事件
server.on('listening', () => {
    const address = server.address();
    console.log(`服务器正在 ${address.address}:${address.port} 监听`);
});

// 处理错误事件
server.on('error', (err) => {
    console.error(`服务器错误:\n${err.stack}`);
    server.close();
});

// 绑定服务器到特定的端口和IP地址
const PORT = 65530;
const HOST = '192.168.1.3';

server.bind(PORT, HOST);
