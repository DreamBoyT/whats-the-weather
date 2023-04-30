const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const appid = "0c393428564cba7f86156e3765b68b99";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=metric";

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      console.log(temp);
      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherDescription);
      const iconId = weatherData.weather[0].icon;
      console.log(iconId);
      const iconUrl = "https://openweathermap.org/img/wn/" + iconId + "@2x.png";
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>Temperature in " + req.body.cityName + " is " + temp + " degrees Celsius</h1>");
      res.write("<img src =" + iconUrl + ">");
      res.send();
    });
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started at port 3000");
});
