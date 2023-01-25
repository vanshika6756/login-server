const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt=require('bcryptjs')
const loginschema = mongoose.Schema({
    email: "String",
    password: {
        type: "String",
        minlength:3
    }
})

loginschema.pre("save", async function (next) {
    if (this.isModified('password')) { 
   // const passwordHash = await bcrypt.hash(password, 10);
   // console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`the current password is ${this.password}`);
        
}
    next();
})



const Aspirant = mongoose.model('Aspirant', loginschema);

module.exports = Aspirant;