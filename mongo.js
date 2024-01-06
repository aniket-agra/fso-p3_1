const mongoose = require ("mongoose");

if (process.argv.length < 3) {
    console.log("no password provided");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://agraaniket:${password}@cluster0.iabvsix.mongodb.net/?retryWrites=true&w=majority`

mongoose.set("strictQuery", false);
mongoose.connect(url);

const entrySchema = new mongoose.Schema({
    name : String,
    number : String
});

const Entry = mongoose.model("Entry", entrySchema);

if (process.argv.length === 3) {
    Entry.find({}).then(result => {
        result.forEach(item => {
            console.log(`Name : ${item.name}\nNumber: ${item.number}`);
        })
        mongoose.connection.close();
    });
}

if (process.argv.length > 3) {
    const entry = new Entry({
        name : process.argv[3],
        number : process.argv[4]
    });
    entry.save().then(result => {
        console.log("entry saved!");
        console.log(result);
        mongoose.connection.close();
    });
}