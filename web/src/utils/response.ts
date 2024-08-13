/**
 * 构建响应内容0表示成功，1表示失败，msg描述信息
 */
export function response({code = 0, msg}:{code?:0|1, msg?:string}={}){
    return {
        code,
        msg
    }
}