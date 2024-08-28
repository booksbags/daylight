export class Config{
    constructor(
        private _colSize:number, // 列
        private _rowSize:number,// 行
        private _size:number,//方块大小
        private _time:number
    ){}
    get col(){
        return this._colSize;
    }
    get row(){
        return this._rowSize;
    }
    get size(){
        return this._size;
    }
    get time(){
        return this._time;
    }
}