const express = require('express');
const app = express();
const path = require('path');
require('../db/connection');
const bcrypt = require('bcryptjs');
const aspirant = require('./models/login');
const port = process.env.PORT || 8000;
const { urlencoded } = require('express');
app.use(express.json());
app.use(express.urlencoded({extended: false }));

const static_path = path.join(__dirname, './templates/views');
console.log(static_path);
app.set('view engine', 'hbs');
app.set('views', static_path);
app.get('/', (req, res) => {
    res.render('index');
})


app.post('/login', async (req, res) => {
    try {
        const email= req.body.email;
       const password=req.body.password;
        useremail = await aspirant.findOne({ email: req.body.email });
    
    //    res.send(useremail.password);
        
        //kunki maine password ko hashed form me already store kr rkhha hai isiliye hm bcrypt.compare ka use krenge login ke liye
        const ismatch = await bcrypt.compare(password, useremail.password);
        if (ismatch) {
            res.send("valid user")
        } else {
            res.send("password do not match,you cant login");
        }
       /* if (password === useremail.password) {
            res.send("valid user")
        }
        else {
            res.send("password do not match");
        }
*/
    } catch (error) {
       
        res.send("create an account");
        console.log("invalid email");
    }
})


app.listen(8000, ()=>{
    console.log(`hello ,server is listening atb the port ${port}`);
})
/*
const user = new aspirant({

    email:req.body.email,
        password: req.body.password
    })  
    const myuser = await user.save();
    res.send(myuser);

}
catch (e) {
    res.status(500).send(e);
}*/

/*const ismatch = bcrypt.compare(password, useremail.password);
if (ismatch) {
    res.send("yes it is working now you can allow the uaer to visit home page,REnder here the home page");
} else {
    res.send("invalid login details");
}
*/