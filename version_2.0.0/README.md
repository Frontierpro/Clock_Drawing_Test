# Clock Drawing Test

This is a [Clock Drawing Test](https://en.wikipedia.org/wiki/Executive_dysfunction#Clock_drawing_test) scoring system implemented with html, css, javascript and python, which is based on ajax + nodejs design framework and mvc design pattern.

In the last version, we use django to make server. It has two disadvantages.

- The compatibility of front end code is terrible. The method of loading static files from django server is unique. While for nodejs server, just define routing paths in server is ok, the front end code is normal.

- The server is asynchronized. This makes server responses with an undefined result before the grading subprocess completes. While for nodejs server, we can introduce callback regulation to make sure result returing after grading subprocess finishes.

Above are reasons for changes from version 1.0.0 to 2.0.0. The main changes is the system architecture.

## Introduction

The clock test is a simple, high-accuracy and culturally relevant deafness screening test that comprehensively reflects cognitive function, and can be used as an early screening tool for examining senile dementia.

Freehand drawing of timepieces is a complex behavioral activity. In addition to spatial construction techniques, many knowledge functions are required to participate, involving memory, attention, abstract thinking, design, layout, use, numbers, calculations, time and space orientation concepts, and operation order. In all, A variety of cognitive functions are in need.

The clock test has a variety of score tables. The system uses a 4-point system, which are:

- A closed circle

- Scales located inside the circle and evenly distributed

- Numbers evenly distributed in the circle and arranged in 1 - 12 order

- The hour and minute hands pointing to the correct time (specified by the tester)

## Dependencies

- [OpenCV](https://opencv.org/) :

`pip install opencv-python`

- [Numpy](https://numpy.org/) :

`pip install numpy`

- [NodeJS](https://nodejs.org/) :

And some other dependencies for NodeJS.

```
npm install express
npm install body-parser
npm install async
```

Make sure you can run the following statements in your Python 3 shell:

```
import numpy
import cv2
```

And in NodeJS file:

```
var express = require("express");
var bodyParser = require("body-parser");
var childProcess = require("async");
```

## Using Method

- Config the dependencies in need

You should make sure having installed python3, nodejs, opencv and numpy.

- Download this repo

Download this repo directly.

! Note : Don't forget to copy the backend part [https://github.com/SPiCaRiA/Clock-Drawing-Test](https://github.com/SPiCaRiA/Clock-Drawing-Test) to the ```App_Server/server``` folder.

- Enter the follow command in cmd

```node server.js``` to start the local server.

- Start project in browser

Enter ```127.0.0.1:8000/index.html``` in the address bar of the browser, and the index page will be shown. It is the introduction on this product.

![The Rending of Index Page](../imgs/index.jpg)

- Use the testing system

Click the try part you will turn to the sketch page, which is a drawing board, just follow the command to draw will get the final result.

![The Rending of Drawing Board](../imgs/sketch.png)

## <span id="design">Design Idea</span>

The whole part adopt MVC design pattern. This repo just implements view and controler. First let's have a look at the structure of the catalog.

```
- App_Server
    - data
    - server
    - server.js
- File_System
    - css
        - index.css
        - sketch.css
    - html
        - index.html
        - sketch.html
    - img
        - bin_select.png
        - bin.png
        - eraser_select.png
        - eraser.png
        - index.png
        - next_select.png
        - next.png
        - pen_select.png
        - pen.png
        - rule_one.png
        - rule_two.png
        - rule_three.png
        - rule_four.png
        - step_one.png
        - step_two.png
        - step_three.png
        - step_four.png
        - symbol.png
    - js
        - index.js
        - jquery-3.4.1.min.js
        - sketch.js
```

[server.js](App_Server/server.js) defines routers of each front end page.

The initial data folder is empty, because this folder stores the paintings you draw on the sketch.

The server folder stores the grading program. You should copy the whole repo from [https://github.com/SPiCaRiA/Clock-Drawing-Test](https://github.com/SPiCaRiA/Clock-Drawing-Test). Don't forget!

The File_System folder stores all the static files of front end including html files, css files, js files and images.

Now, let's have a look at some design details.

This product uses plenty of canvas to do rendering. I packet some functions to draw line and circle which are widely used in the view.

```
function Draw_Line(pen, start_x, start_y, end_x, end_y) {
    pen.beginPath();
    pen.moveTo(start_x, start_y);
    pen.lineTo(end_x, end_y);
    pen.stroke();
}

function Draw_Circle(pen, center_x, center_y, radius, start_angle, end_angle) {
    pen.beginPath();
    pen.arc(center_x, center_y, radius, start_angle, end_angle);
    pen.stroke();
}

function Fill_Circle(pen, center_x, center_y, radius, start_angle, end_angle) {
    pen.beginPath();
    pen.arc(center_x, center_y, radius, start_angle, end_angle);
    pen.fill();
}
```

And I use this way to set the style of the pen.

```
var content_pen = document.getElementById("content_canvas").getContext("2d");
content_pen.strokeWidth = 6;
content_pen.lineWidth = 6;
content_pen.strokeStyle = '#2d85f0';
```

For the drawing board, it requires a equal width and height with the browser. So, I deal it with such scripts.

```
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
```

But this will appear horizontal and vertical scroll bars, and I set the style of the body ```scroll-x:hidden; scroll-y:hidden;``` Thus, the size adaptive will not affect the typesetting of the sketch page.

Besides, what the tester draws should be stored in the server temperorily, but these images are firstly shown as canvas. I turn canvas to base64 encoded image format string, and send it to the server.

The front end is as follows.

```
image_data = canvas.toDataURL("image/png").substr(22);
```

And the server end is.

```
var fs = require("fs");

var imgInfo = req.body.img_info;
var imgID = req.body.img_id;
var imgData = new Buffer(imgInfo, 'base64');
fs.writeFile("data/img.png", imgData, function(err) {
    res.send(JSON.stringify(-1));
});
```

In this way, the canvas from the user end can be stored in the server end. But the first time, I use 'GET' method to send request, and I get nothing at the server end. Perhaps the size of a base64 image is so large. So, I change the ajax request to 'POST' method like this.

```
$.ajax({
    type: 'POST',
    url: '/save/',
    data: {
        'img_info': image_data,
        'img_id': image_id,
        'time_hour': hour,
        'time_minute': minute,
    },
    success: function(data) {
        if (data >= 0) {
            alert('You get ' + data + ' points!');
            window.location.href = "../index";
        }
    }
});
```

At last, in ```server.js```, call the grading part, I use a subprocess to carry out the outer program which stored in [server/](server/).

```
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
```

Here I use callback regulation to make sure results returen after the subprocess completes. Otherwise, because of asynchronization of NodeJS, front end can get only undefined grading results.

And finally return the point.

## Future Extension

There are two directions.

First, now we recommand the tester to use tablet touch screen to draw on the canvas, because it will be more convenient to draw with pen or hand than a mouse. So the input device is limited. You can try to change it that the tester can submit only the final clock through scanning or taking pictures, and than do splitting and grading. Surely, in this way, the backend code should be modified at the same time.

The other, now in fact, the backend grading code just implement two points, You can try to implement another two. And the 'hour' and 'minute' in the fourth grading point has been sent to view model.

```
hour = int(request.POST.get('time_hour'))
minute = int(request.POST.get('time_minute'))
```

And how to extend the other two grading method, please refer to [https://github.com/SPiCaRiA/Clock-Drawing-Test](https://github.com/SPiCaRiA/Clock-Drawing-Test).
