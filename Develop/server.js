//Variable decleration and require section 

const PORT = 3003;
const express = require('express');
const app = express();
const fs = require('fs');


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})


app.listen(PORT, () => {
    console.log(`Working on port ${PORT}!`);
});