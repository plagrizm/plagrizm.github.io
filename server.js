var express = require('express');
var bodyParser = require('body-parser');
var pdf = require('./pdf.js');
var pdf2 = require('./pdf2.js');
//global.hummus = require('hummus');
var app = express();
app.use(express.static('public'));
//pdf2('tst.pdf',[/a/g,'f'])
//pdf.replaceText('tst.pdf', 'output.pdf', 1, ['a', 'p', 'l', 'e'], ['а', 'р', 'ӏ', 'е']);

app.get('/',(req,res)=>{
    res.send('x')
})


app.listen(80, function () {
    console.log('Server Started');
});
