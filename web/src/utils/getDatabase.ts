import { Database } from "./database";

let db:Database;

export function init(name:string, version:number){
    db = new Database(name, version);
}

export function getDatabase(){
    return db;
}