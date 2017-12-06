var express = require('express');
var bp = require('body-parser');
var app = express();
app.use(bp.json());
app.post('/', function(req,res){
    debugger;
    res.json({
        status:'good',
        data:req.body
    });
});
app.listen(3000);