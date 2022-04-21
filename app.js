const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const app = express()
const test = test => {
  console.log("Test Ok")
}

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
  const query = req.body.cityName
  const apiKey = "22df98d4ff5349e701c3bb22fd53308c"
  const unit = "metric"
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit+""
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The Temperature in " +query+ " is " +temp +" degrees Celcius.</h2>")
      res.write("<h3>And the weather condition is " + weatherDescription + "<h3>")
      res.write("<img src=" + imgurl + ">")
    })
  })
})

app.listen(3000, function () {
  test()
})
