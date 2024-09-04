/**
 * 获取路径的最后一个名称
 */

export function getDirectoryName(path:string):string|null{
    return path.split("/").pop() ?? null;
}