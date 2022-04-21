const express = require("express")
const app = express()
const https = require("https")
const test = test => {
  console.log("Test Ok")
}

app.get("/", (req, res) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Basingstoke&appid=22df98d4ff5349e701c3bb22fd53308c&units=metric"

  https.get(url, function (response) {
    console.log(response.statusCode)

    response.on("data", function (data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write(
        "<h1>The Temperature in Basingstoke is " +
          temp +
          " degrees Celcius.</h2>"
      )
      res.write("<h3>And the weather is " + weatherDescription + "<h3>")
      res.write("<img src=" + imgurl + ">")
    })
  })
})

app.listen(3000, function () {
  test()
})
