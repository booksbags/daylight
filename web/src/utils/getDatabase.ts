import { Database } from "./database";

let db:Database;

export function init(name:string, version:number){
    db = new Database(name, version);
    return db.getDb();
}

export function getDatabase(){
    return db;
}