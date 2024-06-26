const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://127.0.0.1:27017/worker');

connect.then(()=>{
    console.log('Database connected successfully....');
})
.catch((error)=>{
    console.log('Database not connected ...'+error);
})

const schema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    // otp:{
    //     type:Number,
    //     required:true
    // }
});

const collection = new mongoose.model('candidate',schema);

module.exports = collection;