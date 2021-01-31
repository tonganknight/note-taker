const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT=process.env.PORT || 3001;

const app = express();

const { v4: uuidv4 } = require('uuid'); // my id generator

const uuid= uuidv4()

const db = require('./db/db.json')// hoping this targets are stored notes

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// serving html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));

})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
    
})

//serving db.json 
app.get("/api/notes", (req, res) =>{
    res.sendFile(path.join(__dirname, './db/db.json'))
});



//serving css  //note to self. This was the solution that I found to make the notes screen accept the incoming CSS
// configure public
app.use(express.static(__dirname + '/public'));


//post req and writing files to Json
app.post("/api/notes", (req, res) => {
    
  let note = req.body; //this targets our  note

    const oldnotes = db; 

    //deconstruct note to include the id 
    note = {
        title: req.body.title,
        text: req.body.text,
        id: uuid
    }

    //writes notes to db Jason

    oldnotes.push(note);
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
    JSON.stringify(oldnotes), null, 2)
       
});

// db.forEach( dbid =>{

//     let arr = db

//     let title =db.title

//     console.log(title)

 
// })
    

app.delete('/api/notes/', (req, res) =>{
    res.sendFile(path.join(__dirname, "./db/db.json"))
});

app.listen(PORT, () => {
    console.log(`API Server now on port ${PORT}!`);
});