import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";

const app=express();
const port = 3000;
const __dirname= dirname(fileURLToPath(import.meta.url))
app.use(express.static("public")); 


var todoList=[];
var completedTask=[];
app.use(bodyParser.urlencoded({ extended:false}));

app.get("/",(req,res)=>{
    res.render("todo.ejs",{toDo : todoList , todoSize : todoList.length , completed : completedTask, completedSize : completedTask.length});
});

app.post("/",(req,res)=>{
    let c=1
    for(let i=0;i<todoList.length;i++){
        if(todoList[i]===req.body["addTask"]){
            c=0;
        }
    }
    if(c===1 && req.body["addTask"].length>0){
        todoList.push(req.body["addTask"]);
    }
    res.render("todo.ejs",{toDo : todoList , todoSize : todoList.length , completed : completedTask, completedSize : completedTask.length});
});


app.post("/complete",(req,res)=>{
    let todayDate=new Date();
    let today = todayDate.toLocaleDateString();
    let time = todayDate.toLocaleTimeString();
    const index = req.body.complete;
    completedTask.push(todoList[index]+" on "+today+","+time);
    todoList.splice(index, 1);
    res.redirect("/");
});

app.post("/delete",(req,res)=>{
    const index = req.body.delete;
    todoList.splice(index,1);
    res.redirect("/");
});


app.listen(port,()=>{
    console.log(`Server running on port ${port}!`);
});