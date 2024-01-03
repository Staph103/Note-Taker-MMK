//Variable decleration and require section 

const PORT = process.env.PORT || 3009;
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading notes file');
    }
    res.json(JSON.parse(data));
  })
})
app.post('/api/notes', (req, res) => {
  const randomID = Math.floor((1 + Math.random()) * 100)

  const newNote = { ...req.body, id: randomID }
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading notes file');
    }
    const notes = JSON.parse(data);
    notes.push(newNote);
    console.log(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading notes file');
      }
      res.json(newNote);
    })
  })
});

app.delete('/api/notes/:id', (req, res) => {
  console.log("hello", req.params.id);
  const deleteNotes = req.params.id;
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading notes file');
    }
    let notes = JSON.parse(data);

    let filteredNotes = notes.filter((note) => {
      console.log(note.id, deleteNotes);
      return note.id != deleteNotes
    })
    console.log(filteredNotes);

    fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), (err) => {
      if (!err) {
        res.json(JSON.stringify(filteredNotes));

      }
    })
  })
})
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);