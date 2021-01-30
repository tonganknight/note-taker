const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT=process.env.PORT || 3001;

const app = express();

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


// function addnote(body, oldnotes){
//     const newnote = body;
//     oldnotes = db;

//     oldnotes.push(newnote);
//     fs.writeFileSync(path.join(__dirname, './db/db.json'),
//     JSON.stringify({ oldnotes}, null, 2)
//     );

    
// }




//post req
app.post("/api/notes", (req, res) => {
    
  const note = req.body; //this targets our  note

    const oldnotes = db;

    oldnotes.push(note);
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
    JSON.stringify(oldnotes), null, 2)

    
  
//     // const setnewnote = addnote(req.body, db);
//     // res.json(setnewnote);

//     res.sendFile( path.join(__dirname, "./db/db.json"))
    

});






app.listen(PORT, () => {
    console.log(`API Server now on port ${PORT}!`);
});