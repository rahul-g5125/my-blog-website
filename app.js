const express = require('express');
const ejs = require('ejs');
const PORT = process.env.PORT || 3030;

app = express()
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.get("/", function(req, res){
    res.render("index");
})

app.listen(PORT, function(){
    console.log("Server has started on port " + PORT);
});
