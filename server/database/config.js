const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/yollo", {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then((result) => {
    console.log("Connected : " + result.connection.db.namespace);
}).catch((error) => {
    console.log(error);
})