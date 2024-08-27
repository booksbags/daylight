import { config } from "./config";
import { SquareType } from "./type";

export class Square {
    private size:number = config.squareSize;
    private _type: SquareType;
    constructor(type?:SquareType){
        this._type = type;
    }
    get type(){
        return this._type;
    }
    set type(v:SquareType){
        this._type = v;
    }
}