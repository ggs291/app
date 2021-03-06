//require
const express = require('express')
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const color = require("colors")

require('dotenv').config()

//instances
const app = express()

//express config
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())

// Express Rutas
app.use('/api', require('./routes/devices.js'))
app.use('/api', require('./routes/users.js'))
app.use('/api', require('./routes/templates.js'))
app.use('/api', require('./routes/webhooks.js'))
app.use('/api', require('./routes/emqxapi.js'))
app.use('/api', require('./routes/alarms.js'))
app.use('/api', require('./routes/dataprovider.js'))

module.exports = app

//Listener
app.listen(process.env.API_PORT, () => {
    console.log("API server listening on port " + process.env.API_PORT)
})

if (process.env.environment != "dev") {
    const app2 = express()

    app2.listen(3002, function(){
        console.log("Listening on port 3002 (for redirect to ssl)")
    })

    app2.all('*', function(req, res){
        console.log("NO SSL ACCESS ... REDIRECTING...")
        return res.redirect("https://" + req.headers["host"] + req.url)
    })
}




// Mongo Connection
const mongoUserName = process.env.MONGO_USERNAME
const mongoPassword = process.env.MONGO_PASSWORD
const mongoHost = process.env.MONGO_HOST
const mongoPort = process.env.MONGO_PORT
const mongoDatabase = process.env.MONGO_DATABASE


var url = "mongodb://" + mongoUserName + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort + "/" + mongoDatabase

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    authSource: "admin"
}


try {
    mongoose.connect(url, options).then(()=>{
        console.log("\n")
        console.log("*****************************".green)
        console.log("- Mongo Sucessfully conected!".green)
        console.log("*****************************".green)
        console.log("\n")
        global.check_mqtt_superuser();
    },
    (err) => {
        console.log("\n")
        console.log("**************************".red)
        console.log("- Mongo Connection Failed!".red)
        console.log(url)
        console.log("**************************".red)
        console.log("\n")
    }
    ) 
} catch (error) {
    console.log("ERROR CONNECTING MONGO")
    console.log(error)
}
