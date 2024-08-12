let instance:DailySotre|null;

export class DailySotre{
    constructor(private _db:IDBDatabase, isCreate:boolean){
        if(instance){
            return instance;
        }else if(isCreate){
            this.create();
        }
        instance = this;
    }
    private create(){
        const store = this._db.createObjectStore("daily", {keyPath:"time"});
        store.createIndex("time", "time", {unique:true});
    }
}