const request = require("request")

const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiZGhhcm1pa2JhdHJhIiwiYSI6ImNreTR3NDBxZjBlNHQydm95OGNocXVtbHYifQ.d0z8gD9tE6JLuLO8cPvY4A&limit=7"
    
    request({url:url,json:true},(error,{body}={})=>{
        if(error){
            callback('unable to connect',undefined)
        }else if(body.features.length==0){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode