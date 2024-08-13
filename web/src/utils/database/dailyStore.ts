import { response } from "@utils/response";

let instance: DailySotre | null = null;

type DailyType = {
    time: string;// 当天的起始时间戳，毫秒
    value: string;// 内容
    img: string[];// 图片
}

export class DailySotre {
    public storeName: string = "daily";
    static getInstance(){
        return instance;
    }
    constructor(private _db: IDBDatabase, isCreate: boolean) {
        if (instance) {
            return instance;
        } else if (isCreate) {
            this.create();
        }
        instance = this;
    }
    private create() {
        const store = this._db.createObjectStore(this.storeName, { keyPath: "time" });
        store.createIndex("time", "time", { unique: true });
    }
    public add(data: DailyType) {
        return new Promise((res, rej) => {
            const req = this._db.transaction(this.storeName, "readwrite").objectStore(this.storeName).add(data);
            req.addEventListener("success", () => {
                res(response())
            });
            req.addEventListener("error", (e)=>{
                rej(response({code:1, msg:"添加失败"}));
            });
        });
    }
    public update(data: DailyType){
        return new Promise<ReturnType<typeof response>>((res, rej) => {
            const req = this._db.transaction(this.storeName, "readwrite")
                .objectStore(this.storeName)
                .put(data);
            req.addEventListener("success", () => {
                res(response())
            });
            req.addEventListener("error", (e)=>{
                rej(response({code:1, msg:"添加失败"}));
            });
        });
    }
}