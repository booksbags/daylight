export function res(type:string, value:any){
    return JSON.stringify({type, value})
}