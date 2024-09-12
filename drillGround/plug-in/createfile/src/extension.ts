import * as vscode from 'vscode';
import { getExtension } from './utils/getExtension';
import { getDirectoryName } from './utils/getDirectoryName';

const tempMap:Map<string, ()=>string> = new Map(); 

const aliasMap:Map<string, string> = new Map(); 
export function activate(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration("createFormateFile");
	function isTargetExtension(extension:string):boolean{
		return `.${extension}` === config.get("extension");
	}
	const template = config.get("template") as Record<string, string>;
	const alias = config.get("alias") as Record<string, string>;
	const fileNames = Object.keys(template);
	async function createFile(file:vscode.Uri){
		const path = file.path;
		const fs = vscode.workspace.fs;
		if(isTargetExtension(getExtension(path)??"")){
			const index = path.lastIndexOf(".");
			const DirPath = path.slice(0, index);
			const newFileUri = vscode.Uri.file(DirPath);
			const directoryName = getDirectoryName(DirPath)!;
			aliasMap.set("#dirName", directoryName[0].toUpperCase() + directoryName.slice(1));
			fileNames.forEach((fileName)=>{
				tempMap.set(fileName, ()=>{
					let contentStr = template[fileName]
					Object.keys(alias).forEach(item=>{
						let dirname = aliasMap.has(alias[item]) ? aliasMap.get(alias[item])! : alias[item];
						contentStr = contentStr.replace(new RegExp(item, "g"), dirname);
					});
					return contentStr;
				})
			})
			await fs.rename(file, newFileUri);
			fileNames.forEach((name)=>{
				const sonPath = vscode.Uri.joinPath(newFileUri, name);
				let temp = "";
				if(tempMap.has(name)){
					temp = tempMap.get(name)?.() ?? "";
				}
				fs.writeFile(sonPath, Buffer.from(temp));
			});
		}
	}
	vscode.workspace.onDidCreateFiles(async (e)=>{
		e.files.forEach(file=>createFile(file))
	})
}

// This method is called when your extension is deactivated
export function deactivate() {}
