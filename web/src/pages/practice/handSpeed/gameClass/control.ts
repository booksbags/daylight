import { Consumer } from "./consumer";
import { Create } from "./create";
import squareStore from "./squareStore";
import { Square } from "./squart";

export class Control{
    private _create:Create;
    private consumer:Consumer;
    private isStop:boolean = false;
    private _clickInfo:number[] = [];
    private _nowClick:number = 0;
    private _deleteTarget:Square|null = null;
    private clickRight(t:string){
        const data = this.data;
        for (const element of data) {
            for (const e of element) {
                if(e.type === t){
                    this._deleteTarget = e;
                    return true;
                }       
            }
        }
        return false;
    }
    private deleteBlock(t:string){
        if(this._deleteTarget){
            this._create.back(this._deleteTarget.type);
            this._deleteTarget.type = undefined;
            this._deleteTarget = null;
        }
    }
    public stop:()=>void;
    private audioRef:React.RefObject<HTMLAudioElement>;
    constructor(
        fn:()=>void, 
        audioRef:React.RefObject<HTMLAudioElement>,
        public drawClick:(clickInfo:number[])=>void
    ){
        this._create = new Create();
        this.consumer = new Consumer();
        this.stop = ()=>{
            this.isStop = true;
            this._create.stop();
            fn();
        };
        this.audioRef = audioRef;
    }
    private listen(event:KeyboardEvent){
        if(this.isStop)return;
        if(this.audioRef.current?.played){
            this.audioRef.current?.pause();
        }
        if(this.audioRef.current?.paused){
            this.audioRef.current?.play();
        }
        const key = event.key;
        if(this.clickRight(key)){
            this.deleteBlock(key);
            this._nowClick += 1;
        }
    }
    begin(){
        this._create.begin();
        this.consumer.init();
        const cb = (e:KeyboardEvent)=>this.listen(e)
        document.addEventListener("keyup", cb);
        const timer = setInterval(()=>{
            this._clickInfo.push(this._nowClick);
            this._nowClick = 0;
            this.drawClick([...this._clickInfo]);
        }, 1000);
        return ()=>{
            document.removeEventListener("keyup", cb);
            clearInterval(timer);
        };
    }
    get clickInfo():number[]{
        return this.clickInfo;
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
    gameOver(){
        const store = squareStore();
        store.clear();
        this.stop();
    }
}