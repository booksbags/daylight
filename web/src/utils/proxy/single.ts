/**
 * 为构造函数附加单例功能
 */
export function single<T extends any[], V>(fn:new (...arg:T)=>V){
    let instance:V|null = null;
    return function(...args:T):V{
        if(instance === null){
            instance = new fn(...args);
        }
        return instance;
    }
}