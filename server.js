const express = require("express")
const server = express()

server.use(express.static("public"))

const nunjucks = require("nunjucks")
nunjucks.configure("views",{
    express: server,
    noCache: true,
})

var fs = require("fs");
    fs.readFile("./carros.json" , "utf8", function(err, data){
    if(err){
        return console.log("Erro ao ler arquivo");
    }
  
    const carros = JSON.parse(data); // faz o parse para json
    server.get("/", function(req, res){
        return res.render("index.html",{carros})

    })
  
})






server.get("/cadastro", function(req, res){
    return res.render("cadastro.html")

})


server.listen(3000)