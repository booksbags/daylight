import mysql from "mysql";

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "bookbag",
    password: "bookbags",
    database: "daylight"
});

connection.connect();

export function runMysql(command:string){
    return new Promise((res, rej)=>{
        connection.query(command, function(error, result){
            if(error)rej(error);
            else res(result);
        })
    })
}



