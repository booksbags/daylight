

let instance:SkillSotre|null;

export class SkillSotre{
    constructor(private _db:IDBDatabase, isCreate:boolean=false){
        if(instance){
            return instance;
        }else if(isCreate){
            this.create();
        }
        instance = this;
    }
    private create(){
        const store = this._db.createObjectStore("skill", {keyPath:"name"});
        store.createIndex("name", "name", {unique:true});
    }
}