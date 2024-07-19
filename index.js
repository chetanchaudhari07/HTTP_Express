const http = require("http");

const server = http.createServer((req,res)=>{
if(req.url==="/home" && req.method==="GET"){
    res.write("welcome to home page")
    res.end()
}else if(req.url==="/cart"){
    res.write("welcome to cart page")
    res.end()
}else if(req.url==="/user"){
    res.write("user's data")
    res.end()
}
else{
    res.write("404")
    res.end()
}



});

server.listen(7890,()=>{
console.log("server is running")


})
