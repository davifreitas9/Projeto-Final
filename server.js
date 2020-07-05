const express = require("express")
const server = express()

const db = require("./db")

server.use(express.static("public"))

server.use(express.urlencoded({ extended: true }))

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
        db.all(`SELECT * FROM cars`, function(err,rows){
            const cars = [...rows]
            console.log(cars)
            return res.render("index.html",{carros,cars})
        })
        
    })
    server.post("/", function(req, res){
        const query = `
            INSERT INTO cars(
                nome,
                tipo,
                desc
            )VALUES(?,?,?);
        `
        const values = [
            req.body.nome,
            req.body.tipo,
            req.body.desc,
        ]
        db.run(query, values, function(err){
            if(err){
                console.log(err)
                return res.send("Erro no banco de Dados!")
            }
            return res.redirect("/")
        })
    })
  
})






server.get("/cadastro", function(req, res){
    return res.render("cadastro.html")

})


server.listen(3000)