const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer = require('nodemailer');
const collection = require('./config');

//creating app

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(express.static('src'));
app.set('view engine','ejs'); 

app.get("/",(req,res)=>{
    res.render('login');
});

app.get('/signup',(req,res)=>{
    res.render('signup');
});

app.get('/register',(req,res)=>{
    res.render('register');
});

app.get('/otp',(req,res)=>{
    res.render('otp');
})


//register user
var otp;

app.post('/register', async(req,res)=>{

    const data = {
        email:req.body.email,
    }

     function generateOtp(){
        const otp = Math.floor(Math.random()*1000000);
        console.log(otp);
        console.log(typeof otp);
        return otp;
    }

        //otp generation and mail sending
    otp = generateOtp();

    const sendMail = ()=>{
        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'jitender.deftsoft@gmail.com',
                pass:'zigj uwpz yhfh ldaa',
            }
        })
    
        var mailOptions = {
            from:'jitender.deftsoft@gmail.com',
            to:data.email,
            subject:'Verification mail',
            text:`${otp}`,
        }
    
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err) console.log(err);
            else {
                console.log('Email sent :'+info.response);
                res.render('otp');
            }  
        });
    }

    sendMail();

})


//otp post method

app.post('/otp',async(req,res)=>{
    
    function verifyOTP(){
        //otp verification
        let enteredOTP = +req.body.otp;
        if(enteredOTP === otp){
            // res.alert('verified');
            console.log('otp verified..');
            res.render('signup');
        }
        else{
            res.send('wrong otp');
        }
    }

    verifyOTP();
})


//signup details
app.post('/signup', async (req,res)=>{

    const data = {
        email:req.body.email,
        password:req.body.password,
    }

    // const userExist = await Collection.findOne({email:data.email});
    // if(userExist){
    //     res.alert('User already exist');
    // }
    // req.body.value = data.email;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password,saltRounds);
    data.password = hashedPassword;

    const userData = await collection.insertMany(data);
    res.send('Data added successfully..');
    
    console.log(userData);

    res.render('login');
});

// login user

app.post('/login',async (req,res)=>{
    try{
        const check = await collection.findOne({email:req.body.email});
        if(!check){
            res.send('User Not registered');
        }
        const isPassword = await bcrypt.compare(req.body.password,check.password);
        if(isPassword){
            res.render('home');
        }
        else{
            res.send('Wrong password');
        }
    }catch{
        res.send('wrong details.');
    }
})



//otp generation

const port = 5000;

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}/`);
})