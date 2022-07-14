const axios = require("axios").default;


console.log("started")
axios.get("https://jsonplaceholder.typicode.com/todos").then((data)=>{
    console.log(data)
}).catch(err=>{
    console.log(err);
})

console.log("ended")

