/**
 * 生成min~max直接的整数
 */
export function getInterRandom(min:number, max:number){
    return Math.floor(min + Math.random() * max);
}