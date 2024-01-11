const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URL;

mongoose.connect(url)
        .then(result => console.log("MongoDB connected"))
        .catch(error => console.log("Error connecting to MongoDB.", error.message));

const entrySchema = new mongoose.Schema({
    name : String,
    number : String
});

entrySchema.set("toJSON", {
    transform : (document, returnedObject) => {
        returnedObject.id = document._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model("Entry", entrySchema);