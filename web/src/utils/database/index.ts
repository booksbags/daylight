import Toast from "@utils/toast";
import { SkillSotre } from "./skillStore";
import { DailySotre } from "./dailyStore";

const storeList = [
    DailySotre, 
    SkillSotre,
];

function init(db:IDBDatabase, isCreate:boolean=false){
    storeList.forEach((create)=>{
        new create(db, isCreate);
    })
}

export class Database {
    private _db?: Promise<IDBDatabase>;
    constructor(public name: string, public version: number) {
        this.open(name, version);
    };
    private open(name: string, version: number) {
        this._db = new Promise((res, rej) => {
            const openReq = indexedDB.open(name, version);
            openReq.addEventListener("success", (e) => {
                const db = (e.target as any).result;
                Toast.show("数据库启动成功");
                init(db);
                res(db);
            });
            openReq.addEventListener("error", () => {
                rej("数据库启动失败");
            });
            openReq.addEventListener("upgradeneeded", (e) => {
                const db:IDBDatabase = (e.target as any).result!;
                init(db, true);
            });
        })
    };
}