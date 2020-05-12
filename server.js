var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static('public'));
app.get('*',(req,res)=>{
    res.send('x')
})


app.listen(80, function () {
    console.log('Server Started');
});