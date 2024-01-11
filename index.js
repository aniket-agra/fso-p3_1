require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Entry = require("./models/entry");

const app = express();

app.use(cors());
app.use(express.static("dist"));

morgan.token("postContent", function (req, res) {
    return JSON.stringify(req.body);
});

app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :postContent"));

app.get("/api/persons", (req, res) => {
    Entry.find({}).then(result => res.json(result));
})

app.get("/info", async function (req, res) {
    let count = await Entry.countDocuments({});
    let retStr = `<p>Phonebook has info for ${count} people</p>`;
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
    const newPersonData = {...req.body};
    let flagNoName = newPersonData["name"] === undefined || newPersonData["name"].length === 0;
    let flagNoUniqueName = data.filter(element => element["name"] === newPersonData["name"]).length > 0;
    let flagNoNumber = newPersonData["number"] === undefined || newPersonData["number"].length === 0;
    if (flagNoName) {
        return res.status(400).json({error : "Name missing"});
    }
    if (flagNoUniqueName) {
        return res.status(400).json({error : "Name must be unique"});
    }
    if (flagNoNumber) {
        return res.status(400).json({error : "Number missing"});
    }
    newPersonData.id = Math.ceil(100000*Math.random());
    data = data.concat(newPersonData);
    res.status(200).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})