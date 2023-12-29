//Variable decleration and require section 

const PORT = 3009;
const { randomUUID } = require('crypto');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('develop/public'));


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'develop/public/index.html'))
})

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname, 'develop/public/notes.html'))
})
app.get('/api/notes',(req,res)=>{
  fs.readFile('develop/db/db.json','utf8',(err, data) =>{
    if(err){
      console.error(err);
      return res.status(500).send('Error reading notes file');
    }
    res.json(JSON.parse(data));
  })
})
app.post('/api/notes',(req,res)=>{
  const newNote = {...req.body,id: randomUUID}
  fs.readFile('develop/db/db.json','utf8',(err, data) =>{
    if(err){
      console.error(err);
      return res.status(500).send('Error reading notes file');
    }
  
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
console.log('node is working');