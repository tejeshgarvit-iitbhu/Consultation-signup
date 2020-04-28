const express = require('express');
const app=express();
const bodyParser = require('body-parser');
const https=require('https');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
  const fname=req.body.firstName;
  const lname=req.body.lastName;
  const email=req.body.email;
  console.log(fname,lname,email);

  const data={
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME:fname,
          LNAME: lname
        }
      }
    ]
  };
  const jsonData= JSON.stringify(data);
  const url='https://us8.api.mailchimp.com/3.0/lists/42d8b7aabc';
  const options={
    method: "POST",
    auth: "tejesh1:75f160c3bd7904e55b97d7855dde8b7b-us8"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
})

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
  console.log("Server running on port 3000");
})
//API Key
// 75f160c3bd7904e55b97d7855dde8b7b-us8

//List id
// 42d8b7aabc
