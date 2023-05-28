const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const {Pool} = require("pg")
const config = require("./config")
const redis = require("redis")

const app = express()

app.use(cors())

app.use(bodyParser.json())


console.log(config)

const pgClient = new Pool({
    user:config.PgUserName,
    database:config.PgDataBase,
    port:config.PgPort,
    password:config.PgPassword,
    host:config.PgHost
})

pgClient.on("error",()=>{ console.log("LOST PG CONNECTION") })

pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT) ').catch((error)=>{console.log(console.log("Error creating Table",error))})

app.get("/get",(req,res)=>{
    console.log("Hai")
})



// 

const redisClient = redis.createClient({
   host:config.redisHost,
   port:config.redisPort
})



const redisClientPublisher = redisClient.duplicate()


app.get("/values/all",async(req,res)=>{
    const values = await pgClient.query("SELECT * FROM values");
 
    return res.send(values.rows)
 })
 
 app.get("/current/values",async(req,res)=>{
    redisClient.hgetall("values",(err,values)=>{
        return res.send(values)
    })
 })


 app.post("/values",async(req,res)=>{
    const index = req.body.index

    if(index > 40){
       res.status(420).send("Index too high")
    }
    redisClient.hset("values",index,"Nothing index")
    redisClientPublisher.publish("insert",index)
    pgClient.query("INSERT INTO values (number) VALUES($1)",[index])

    res.send({working:"true"})
 })

app.listen("5000",()=>{
    console.log("Server is working")
})

