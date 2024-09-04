/**
 * 返回文件扩展名
 */
export function getExtension(path:string):string|null{
    const index = path.lastIndexOf(".");
    if(index === -1){
        return null;
    }else{
        return path.slice(index+1);
    }
}