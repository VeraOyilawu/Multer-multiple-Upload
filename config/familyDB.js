const mongoose = require("mongoose")
const url = "mongodb://localhost/monoDb"

mongoose.connect(url)
.then(() => {
    console.log("connected sucessfully.......");
})
.catch(() => {
    console.log("unable to connect.....");
})