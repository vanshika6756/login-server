const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/login-form', { useNewUrlParser: true })
    .then(()=> {
        console.log("mongodb connection successful........");
    }).catch((e) => {
        console.log(e);
    })