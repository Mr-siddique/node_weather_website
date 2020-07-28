const express = require("express")
const path = require("path")
const hbs = require("hbs")
const app = express()
const port = process.env.PORT || 3000
const geoCode = require("./utils/geocode")
const foreCast = require("./utils/forecast")

app.set("view engine", "hbs")
//changing path of template engine
app.set("views", path.join(__dirname, "../template/views"))
//path for parials
hbs.registerPartials(path.join(__dirname, "../template/partials"))

// setting path for 3rd party files
app.use(express.static(path.join(__dirname, "../public")))

app.get("", (req, res) => {
    res.render("index", { title: "weather app", name: "Mr_siddique" })
})
app.get("/about", (req, res) => {
    res.render("about", { title: "about page", name: "mr_siddique" })
})
app.get("/help", (req, res) => {
    res.render("help", { title: "help Page", name: "mr_siddique" })
})
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        res.send({ mgs: "address not found" })
    } else {
        const address = req.query.address
        geoCode(address, (error, { longitude, latitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            foreCast(longitude, latitude, (error, { description, temperature, feels_like ,humidity} = {}) => {
                if (error)
                    return res.send({ error })
                res.send({ description, temperature, location, feels_like ,humidity})
            })
        })
    }
})
app.get("/help/*", (req, res) => {
    res.render("404", { title: "unknown article", name: "mr_siddique", mgs: "article not found" })
})
app.get("*", (req, res) => {
    res.render("404", { title: "404page", name: "mr_siddique", mgs: "page not found" })
})
app.listen(port, (req, res) => {
    console.log("server is up on port "+ port)
})
//req.query returns all the query strings in the browser