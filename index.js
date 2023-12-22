const express = require("express");
const app = express();

app.use(express.json());

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
    retStr = retStr.concat(`<p>${new Date()}</p>`);
    res.send(retStr);
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const personData = data.filter(element => element.id === id);
    if (personData.length > 0) 
        res.json(...personData);
    else
        res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    data = data.filter(element => element.id !== id);
    res.status(204).end();
});

app.post("/api/persons", (req,res) => {
    const newPersonData = req.body;
    newPersonData.id = Math.ceil(100000*Math.random());
    data = data.concat(newPersonData);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})