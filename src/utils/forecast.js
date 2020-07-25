const request = require("request")
const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5726fe28b20a7194fa433b38dfdada79&query=${latitude},${longitude}&units=f`
    request({ url, json: true }, (err,{body}) => {
        if (err) {
            callback("unable to fetch data", undefined)
        } else if (body.error) {
            callback("please enter a valid location", undefined)
        } else {
            callback(undefined, {
                description:body.current.weather_descriptions[0],
                temperature:body.current.temperature,
                feels_like: body.current.feelslike
            })
        }
    })
}
module.exports=forecast