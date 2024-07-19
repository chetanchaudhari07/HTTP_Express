
const express = require("express");
const fs = require("fs");


const server = express();

server.use(express.json());

server.get("/home",(req,res)=>{
    res.send("welcome to home page");
});

server.get("/user-data",(req,res)=>{
    const data = fs.readFileSync("./db.json","utf-8");

    res.send(data);
});

server.post("/ToDo",(req,res)=>{
    const incommngData = req.body
    

    const userdata = fs.readFileSync("./db.json","utf-8");
   
    const parseddata = JSON.parse(userdata);
    console.log("old+newdata",parseddata);
    parseddata.todos.push(incommngData);
    fs.writeFileSync("./db.json",JSON.stringify(parseddata));

    res.send(parseddata);

});

server.patch("/ToDo/:id",(req,res)=>{
const id = parseInt(req.params.id,10);
const update = req.body
const userdata = fs.readFileSync("./db.json","utf-8");

const parseddata = JSON.parse(userdata);

const todoIndex = parseddata.todos.findIndex(todo => todo.id === id);

if(todoIndex ===-1){
    return res.status(404).send({ error: "To-do item not found" });
}

parseddata.todos[todoIndex]={...parseddata.todos[todoIndex],...update}

fs.writeFileSync("./db.json",JSON.stringify(parseddata));

res.send(parseddata.todos[todoIndex]);




});


server.delete("/ToDo/:id",(req,res)=>{
    const id = parseInt(req.params.id,10);
    const userdata = fs.readFileSync("./db.json","utf-8");

    const bigdata = JSON.parse(userdata);
    const newtodos = bigdata.todos.filter(todo => todo.id !==id);
    if(newtodos.length === bigdata.todos.length){
        return res.status(404).send({ error: "To-do item not found" });

    }
    bigdata.todos = newtodos;
    fs.writeFileSync("./db.json",JSON.stringify(bigdata));
    res.send({ message: "To-do item deleted" });

});





server.listen(1880,()=>{
    console.log("server is running")
});