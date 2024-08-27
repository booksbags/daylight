import { config } from "./config";
import { Create } from "./create";
import squareStore from "./squareStore";
import { Square } from "./squart";

export class Consumer{
    private _container:Square[][] = [];
    init(){
        this._container = Array(config.colNumber).fill(0).map(()=>[]);
        this._container.forEach((item)=>{
            for(let i = 0; i < config.rowNumber; i ++){
                item.push(new Square(undefined))
            }
        });
    }
    getNewData(){
        const store = squareStore();
        const data = store.get();
        this._container.forEach((item, index)=>{
            item.pop();
            item.unshift(data[index]??new Square());
        })
    }
    getLastEle(){
        return this._container.reduce((pre, now)=>{
            pre.push(now[now.length - 1]);
            return pre;
        }, [])
    }
    get container(){
        return this._container;
    }
}