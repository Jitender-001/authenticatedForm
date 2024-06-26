const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/worker');

connect.then(()=>{
    console.log('Database connected successfully....');
})
.catch(()=>{
    console.log('Database not connected ...')
})

const schema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    otp:{
        type:Number,
        required:true
    }
});

const collection = new mongoose.model('candidate',schema);

module.exports = collection;