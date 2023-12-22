const express = require("express");
const app = express();

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get("/api/persons", (req, res) => {
    res.json(data);
})

app.get("/info", (req, res) => {
    let retStr = `<p>Phonebook has info for ${data.length} people</p>`;
    let currentTime = new Date();
    retStr = retStr.concat(`<p>${currentTime}</p>`);
    console.log(retStr);
    res.send(retStr);
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})