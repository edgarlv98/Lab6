const path = require('path')
const express = require('express')
const mapbox = require('./mapbox.js')
const app = express()

const city = 'Monterrey'

const port = 3000
const publicDir = path.join(__dirname, 'public')

app.use(express.static(publicDir))


app.get('/weather', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(!req.query.search){
        return res.send({
            error: 'Ciudad invalida'
        })
    }
    mapbox.mapBox(req.query.search, function(error, response){
        if(error){
            return res.send({
                error: error
            })
        }
        const city = req.query.search
        const long = response.longitud
        const lati = response.latitud
        mapbox.darkSky(lati, long, function(error, response){
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                location: city,
                weather: response.weather
            })
        })
    })
})

app.listen(port, function(){
    console.log('up and running')
})