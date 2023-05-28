const redis = require("redis")
const config = require("./config")


console.log(config)

const redisCient = redis.createClient({
   host:config.REDIS_HOST,
   port:config.REDIS_PORT
})
const listener = redisCient.duplicate()

const fib = function(index){
   if(index < 2){
      return 1
   } 
   return fib(index - 1) + fib(index - 2)
}


listener.on('message',(channel,message)=>{
   console.log("Trigering",channel)
   return redisCient.hset("values",message, fib(message) )
})

listener.subscribe("insert")