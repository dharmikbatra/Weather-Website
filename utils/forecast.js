const request = require('request');

const forecast = (lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=efa5bbdf670de32d47ccb53ebba80cdf&query='+lat+','+long
    request({url:url,json:true},(error,{body}={})=>{
        if(error){
            callback('unable to connect',undefined)
        }else if(body.error){
            callback('invalid input'+body.error.info,undefined);
        }else{
            var x = body.current;
            callback(undefined,{
                temprature:x.temperature, 
                feelslike:x.feelslike
            });
        }
    })
}

module.exports = forecast
// http://api.weatherstack.com/current?access_key=efa5bbdf670de32d47ccb53ebba80cdf&query=37.8267,-122.423