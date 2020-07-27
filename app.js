const express = require("express");
const https= require("https");
const app = express();
const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(req,res){
  const city = req.body.cityname;
  const appid="c90435542e38e4e90be6d0695ce53d14";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+"&units="+unit;

  https.get(url,function(response){
    console.log(response.statusCode);
  response.on("data",function(data){
    const weatherData = JSON.parse(data);
    const iconImage= weatherData.weather[0].icon;
    const icon =  "http://openweathermap.org/img/wn/"+iconImage+"@2x.png";
    res.write("<h1>The Temp in "+city+" is "+weatherData.main.temp+"</h1>");
     res.write("<p>The weather description is "+weatherData.weather[0].description+"<p>");
     res.write("<img src="+icon+">");
    res.send();

})
})

});

app.get("/",function(req,res){
res.sendFile(__dirname +"/index.html");

});

app.listen(3000,function(){
  console.log("Server Started");
});
