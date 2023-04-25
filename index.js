/* Simple Web Server */

// const http = require('http');

// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       date: "2022-05-30T17:30:31.098Z",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only Javascript",
//       date: "2022-05-30T18:39:34.091Z",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       date: "2022-05-30T19:20:14.298Z",
//       important: true
//     }
//   ]

// const app = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end(JSON.stringify(notes));
// });

// const PORT = 3001;
// app.listen(PORT)
// console.log(notes)

/* Working with Express */

const express = require('express') // express is a function that is used to create an express application stored in app variable
const app = express() // initializing express() function with the variable app

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
  }
]

/* Below we're defining two routes to the application */

/* This one defines an event handler that is used to handle HTTP GET requests made to the application's root */
app.get('/', (req, res) => { //Two parameters: request/response | request contains the inforamtion of the HTTP request | response defines how the request is responsed to
  res.send('<h1>The server has been started successfully</h1>') //we're using send() method of the rsponse object to send a string containing some text
})



/* This one defines an event handler that hndles HTTP GET requests made to the notes path of the apllication */
app.get('/api/notes/:id', (req, res) => { 
  // const id = Number(req.params.id)
  // const note = notes.find(note => {
  //   console.log(note.id, typeof note.id, id, typeof id, note.id === id)
  //   return note.id === id;
  // })
  const id = Number(req.params.id)
  const note = notes.find(notes=>notes.id === id)
  // res.json(note) //this response will no show up any errors if we open the pages from the note array by id that do not exist
  if (note) {
    res.json(note)
  } else {
    res.statusMessage = "THE PAGE DOES NOT EXIST" // Sending this message to the network tab in Header with Status Code parameter
    res.status(404).end()
  }
})

/* This one defines an event handler that hndles HTTP DELETE requests made to the notes path of the apllication */
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note=>note.id !==id)

  res.status(204).end()
})

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})