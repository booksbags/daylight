import { response } from "@utils/response";

let instance:Practice|null;

type PracticeType = {
    name:string,
    info:{
        level:string,
        destinationde:string
    }[]
}

export class Practice{
    public storeName:string = "practice";
    constructor(private _db:IDBDatabase, isCreate:boolean=false){
        if(instance){
            return instance;
        }else if(isCreate){
            this.create();
        }
        instance = this;
    }
    private create(){
        const store = this._db.createObjectStore("practice", {keyPath:"name"});
        store.createIndex("name", "name", {unique:true});
    }
    public add(data: PracticeType) {
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
}