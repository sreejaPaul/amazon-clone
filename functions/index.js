const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51JzBPMSBx40pS7qH9y64wHkwZIhs3rGbyC8jc7J0RYNv1BihQJiai9nA2ec3HzuI5Qc6ECJzZFNhnRvxglJ8HNlr00KaP2IjRF");


//express app on cloud function


//API
//App Config
const app =express();
//Middleware
app.use(cors({origin: true}));
app.use(express.json());

//API Routes
app.get('/',(request,response)=>response.status(200).send("Hello World"));
app.get('/me',(request,response)=>response.status(200).send("Hello Me"));

app .post('/payment/create', async(request, response)=>{
    const total = request.query.total;
    // console.log("Payment Request Received For The Amount ", total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunit of currency
        currency:"INR",
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,  
    })
    
})

//Listen Command
exports.api = functions.https.onRequest(app);

//Example EndPoint
//http://localhost:5001/clone-5356b/us-central1/api

