const request=require("request")
const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWFhbWlyc2lkZGlxdWUiLCJhIjoiY2tjc3h5aG43MXQ2NDJ4czY1M3hveW5mdyJ9.kfB5pN4dkYA2SpwveT6uUg&limit=1`
    request({url, json: true }, (err, {body}={}) => {
        if (err) {
            callback("Unable to fetch data", undefined)
        } else if (body.features.length === 0) {
            callback("invalid Search term..Please try another one!", undefined)
        } else {
            callback(undefined,{
                longitude:body.features[0].center[0],
                Latitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
}
module.exports=geoCode