import { Square } from "./squart";
import SquareStore from "./squareStore";
import { getInterRandom } from "@utils/getInterRandom";
import { SquareType } from "./type";
import { config } from "./config";
const value:SquareType[] = [
    'a', 
    'b', 
    'c', 
    'd', 
    'e', 
    'f', 
    'g', 
    'h', 
    'i', 
    'j', 
    'k', 
    'l', 
    'm', 
    'n', 
    'o', 
    'p', 
    'q', 
    'r', 
    's', 
    't', 
    'u', 
    'v', 
    'w', 
    'x', 
    'y', 
    'z', 
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'R',
    'Q',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    ',',
    '.',
    '/',
    ';',
    "'",
    '[',
    ']',
    '\\',
    '`',
    '<',
    '>',
    '?',
    ':',
    '"',
    '{',
    '|',
    '_',
    '+',
    '-',
    '~',
    '@',
    '#',
    '￥',
    '%',
    '^',
    '&',
    '*',
    '(',
    '!',
    ')',
    '}'];
value.sort((a, b)=>Math.random() - 0.5)
// 1s 生产五个方块
export class Create{
    private _time?:NodeJS.Timeout;
    begin(){
        const store = SquareStore();
        for(let i = 0; i < config.createSpeed; i ++){
            store.add(new Square(value.shift()))
        }
        this._time = setInterval(()=>{
            for(let i = 0; i < config.createSpeed; i ++){
                store.add(new Square(value.shift()))
            }
        }, 1000);
    }
    stop(){
        this._time && clearInterval(this._time);
    }
    static back(s:SquareType){
        if(value.includes(s)){
            throw new Error("逻辑错误");
        }
        value.push(s);
    }
}