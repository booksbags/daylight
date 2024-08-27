import { Consumer } from "./consumer";
import { Create } from "./create";

export class Control{
    private _create:Create = new Create();
    private consumer:Consumer = new Consumer();
    private _gameOver:boolean = false;
    private deleteBlock(t:string){
        const data = this.data;
        data.forEach(item=>{
            item.forEach(i=>{
                if(i.type === t){
                    Create.back(i.type);
                    i.type = undefined;
                }
            })
        })
    }
    private gameOver:()=>void;
    private audioRef:React.RefObject<HTMLAudioElement>;
    constructor(fn:()=>void, audioRef:React.RefObject<HTMLAudioElement>){
        this.gameOver = ()=>{
            this._gameOver = true;
            fn();
        };
        this.audioRef = audioRef;
    }
    private listen(event:KeyboardEvent){
        if(this._gameOver)return;
        this.audioRef.current?.pause();
        this.audioRef.current?.play();
        const key = event.key;
        this.deleteBlock(key);
    }
    begin(){
        this._create.begin();
        this.consumer.init();
        const cb = (e:KeyboardEvent)=>this.listen(e)
        document.addEventListener("keyup", cb);
        return ()=>{
            document.removeEventListener("keyup", cb);
        };
    }
    get data(){
        return this.consumer.container;
    }
    update(){
        const ele = this.consumer.getLastEle();
        ele.forEach((item)=>{
            if(item.type != undefined){
                this.gameOver();
                this._create.stop();
            }
        });
        this.consumer.getNewData();
    }
}