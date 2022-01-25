const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

// const { hasSubscribers } = require('diagnostics_channel');


const staticPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views');  
const partialPath = path.join(__dirname,'../templates/partials') 
const port  = process.env.PORT || 3000
const app = express()

//set handlebars 
app.set('view engine', 'hbs')  //default name for directory is views
app.set('views',viewsPath) /// to change the directory name to anything we want
app.use((express.static(staticPath)))     // customize the server

hbs.registerPartials(partialPath)
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Dharmik'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Dharmik'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Dharmik'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide some address term'
        })
    }
    geocode(req.query.address,(error,value)=>{
        if(error){
            console.log(error);
            return res.send({error:error});}
        var {latitude,longitude,location} = value
        forecast(latitude,longitude,(err,weather)=>{
            if(error){return res.send({error:err})}
            res.send({
                address:value,
                temp:weather.temprature,
                feelslike:weather.feelslike
                // location:'rohtak'
            })
        })        
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide some search term'
        })
    }
    res.send({
        query:req.query,
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('notFound',{
        title:'404',
        name:'Dharmik',
        message:'article help not found'
    })
})
app.get('*',(req,res)=>{
    res.render('notFound',{
        title:'404',
        name:'Dharmik',
        message:'not found'
    })
})
app.listen(port,()=>{
    console.log('server is up on '+port);
})