const express = require('express');
const app = express();

const http = require('http').createServer(app);
app.use(express.json());


app.get("/", (req, res) =>{
    res.send({message: "Hello world"});
});

const PORT = process.env.PORT || 5001;

http.listen(PORT, ()=> console.log(PORT));