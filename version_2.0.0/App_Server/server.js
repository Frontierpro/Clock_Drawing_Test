var express = require("express");
var bodyParser = require("body-parser");
var childProcess = require("child_process");
var fs = require("fs");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("../File_System/html"));
app.use(express.static("../File_System/css"));
app.use(express.static("../File_System/js"));
app.use(express.static("../File_System/img"));

app.post("/get_res", function(req, res) {
    var imgInfo = req.body.img_info;
    var imgID = req.body.img_id;

    var imgData = new Buffer(imgInfo, 'base64');
    if (parseInt(imgID) == 0) {
        fs.writeFile("data/1.png", imgData, function(err) {
            res.send(JSON.stringify(-1));
        });
    }
    else if (parseInt(imgID) == 1) {
        fs.writeFile("data/2.png", imgData, function(err) {
            res.send(JSON.stringify(-1));
        });
    }
    else if (parseInt(imgID) == 2) {
        fs.writeFile("data/3.png", imgData, function(err) {
            res.send(JSON.stringify(-1));
        });
    }
    else {
        fs.writeFile("data/4.png", imgData, function(err) {
            var timeHour = req.body.time_hour;
            var timeMinute = req.body.timeMinute;
            var cmd = "cd server && python -m CDT ../data/1.png ../data/2.png ../data/3.png ../data/4.png";
            var subProcess = childProcess.exec(cmd, function(error, stdout, stderr) {
                if (error) {
                    console.log(error.stack);
                    console.log('Error code: '+ error.code);
                    console.log('Signal received: '+ error.signal);
                    res.send(JSON.stringify(5));
                }
                else {
                    console.log(stdout);
                    res.send(JSON.stringify(stdout));
                }
            });
        });
    }
});

var server = app.listen(8080);
