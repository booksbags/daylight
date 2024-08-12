export abstract class StoreTemplate{
    protected create(){}
    constructor(private _db:IDBDatabase){};
}