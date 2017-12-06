
var cluster = require('cluster');



if(cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    var express = require('express');
    var bp = require('body-parser');
    var _ = require('underscore');

    var MongoClient = require('mongodb').MongoClient;

    var app = express();
    app.use(bp.json());
    app.use(express.static('public'));

    var db;

    MongoClient.connect('mongodb://admin:admin@ds131826.mlab.com:31826/sgdb', (err, database)=>
    {
        if(err)
            return console.log(err);
        else
            db = database;
    });

    app.get('/gettasks', (req,res)=>
    {
        db.collection('employeedb').find().toArray((err,result)=>
        {
            if(err)
                console.log(err);
            else
                res.json(result);
        });
        console.log('Process ' + process.pid);
    });



    app.put('/update', (req,res)=>
    {
        db.collection('employeedb').findOneAndUpdate({empId:req.body.empId},
        {
            $set: {
                empId: req.body.empId,
                empname: req.body.empname,
                desg: req.body.desg
            }
        },
        {
            sort:{_id:-1},
            upsert: true
        },
        (err,result)=>
        {
            if(err)
            res.send(err);
            else
                res.json(result);
        })
        console.log('Process ' + process.pid);
    });


    
        
    

    app.post('/posttasks', (req,res)=>
    {
       /* var data = req.body;
        data.id = taskid++;
        pendingtasks.push(data);
        res.json(data);*/

        db.collection('employeedb').save(req.body, (err, result)=>
        {
            if(err)
                console.log(err);
            else{
                console.log("added to database");
                res.json(req.body);
            }

        });

        console.log('Process ' + process.pid);
    });

    app.delete('/delete', (req, res)=>
    {
        db.collection('employeedb').findOneAndDelete({empId:req.body.empId},(err,result) =>
        {
            if(err)
                console.log(err);
            else
                res.send("record deleted");
        });

        console.log('Process ' + process.pid);
    });


    app.listen(3000, ()=>
    {
        console.log('server is started');
    });

}
