const express = require('express');
const {MongoClient, ObjectId}  = require("mongodb");
// local host ou 127.0.0.1
//const DB_URL = "mongodb://127.0.0.1:27017";
const DB_URL = "mongodb+srv://admin:CaoqfNpjW4l6Rvvy@cluster0.9qzziih.mongodb.net";
const DB_NAME = "Ocean_jornadafullstack";
const { link } = require('fs');
async function main(){
// conexão com o banco 
console.log("Conectando banco de dados.....");
const client = await MongoClient.connect(DB_URL);
console.log("Banco de dados conectado com sucesso");
const db = client.db(DB_NAME);
const collection = db.collection("itens");

const app = express()

app.get('/', function (req, res) {
  res.send('Hello, World !!!')
})

// endipoint/oi --> "ola munndo"
app.get("/oi",function (req, res){
    res.send("Bom dia");
});



// lista 
const itens = ["Flamengo", "Palmeiras", "Atletico Mineiro"];

// crud da lista
    // reuisição json
    app.use(express.json());

    //endpoint Read All [get]/item
    app.get("/item", async function (req, res){
        const documentos = await collection.find().toArray();
        res.send(documentos);
    });


    // endpoint Read Single by id [get]/item/ :id
    app.get("/item/:id", async function  (req, res){ 
        const id = req.params.id;
        const item = await collection.findOne({_id:  new ObjectId(id)});
        res.send(item);
    });

    // endpoint create --> [post] / item

    app.post("/item", async function  (req, res){ 

        const item = req.body;
        await collection.insertOne(item);
        res.send(item);
    });

    // endpoint update --> {put} /item/id
        app.put("/item/:id", function(req, res){
        const id = req.params.id;
        const body = req.body;
        collection.updateOne(
            {_id: new ObjectId(id)},
            {$set: body}
        );
        res.send(body);
    });

    app.listen(3000);
}

    main();