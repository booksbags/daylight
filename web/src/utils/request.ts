import Toast from "./toast";

export type RequestType = {
    method?: "GET" | "POST" | "DELETE" | "PUT",
    url: string,
    data?: Record<string, string | number | null | undefined>,
    expireTime?:number,
}

const path = "http://127.0.0.1:8080"
/**
 * 发起网络请求
 * undefined会被转化为null传递给服务器
 */

export async function request<T>({
    method = "GET", url, data={},expireTime=2*60*1000
}: RequestType): Promise<T> {
    return new Promise((res, rej) => {
        const xml = new XMLHttpRequest();
        let sendUrl: string = `${path}${url}`;
        if (["GET", "DELETE"].includes(method)) {
            const keys = Object.keys(data);
            let params = "";
            let paramList: string[] = [];
            keys.forEach((key) => {
                paramList.push(`${key}=${data[key] ?? null}`);
            });
            params = paramList.join("&");
            sendUrl += `?${params}`;
        }
        xml.addEventListener("readystatechange", () => {
            if (xml.readyState === 4) {
                res(xml.responseText as T);
                clearInterval(timer);
            }else if(xml.readyState === XMLHttpRequest.UNSENT && xml.status === 0){
                Toast.show("网络连接超时");
                rej("网络连接超时");
            }
        });
        xml.open(method, sendUrl);
        if (["GET", "DELETE"].includes(method)) {
            xml.send();
        } else {
            xml.send(JSON.stringify(data));
        }
        const timer = setTimeout(()=>{
            xml.abort();
        },Math.max(expireTime, 3000))
    })
}