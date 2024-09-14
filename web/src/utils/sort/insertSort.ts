/**
 * 使用插入排序构成数组
 */
export function insertSort<T>(array:T[], ele:T, compare:(pre:T, next:T)=>boolean){
    const length = array.length;
    if(length === 0)return array.push(ele);
    for(let i = 0; i < length; i ++){
        if(compare(array[i], ele)){
            return array.splice(i, 0, ele);
        }
    }
    array.push(ele);
    return array;
}