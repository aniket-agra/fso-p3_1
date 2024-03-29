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

app.get("/info", (req, res) => {
    Entry.countDocuments({}).then(count => {
        let retStr = `<p>Phonebook has info for ${count} people</p>`;
        retStr = retStr.concat(`<p>${new Date()}</p>`);
        res.send(retStr);
    });
})

app.get("/api/persons/:id", (req, res) => {
    Entry.findById(req.params.id).then(result => {
        if (result)
           res.json(result);
        else
            res.status(404).end();
    }).catch(error => next(error));
});

app.delete("/api/persons/:id", (req, res) => {
    Entry.findByIdAndDelete(req.params.id).then(result => {
        res.status(204).end()
    }).catch(error => next(error));
});

app.post("/api/persons", (req,res) => {
    const newPersonData = {...req.body};
    let flagNoName = newPersonData["name"] === undefined || newPersonData["name"].length === 0;
    // let flagNoUniqueName = data.filter(element => element["name"] === newPersonData["name"]).length > 0;
    let flagNoNumber = newPersonData["number"] === undefined || newPersonData["number"].length === 0;
    if (flagNoName) {
        return res.status(400).json({error : "Name missing"});
    }
    // if (flagNoUniqueName) {
    //     return res.status(400).json({error : "Name must be unique"});
    // }
    if (flagNoNumber) {
        return res.status(400).json({error : "Number missing"});
    }
    const newEntry = new Entry({
        name : newPersonData["name"],
        number : newPersonData["number"]
    });

    newEntry.save().then(result => {
        console.log("saved ", result);
        res.status(200).end();
    })
});

const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return res.status(400).send({error : "malformed id"});
    }

    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})