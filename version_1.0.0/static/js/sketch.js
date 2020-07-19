var count = 0;
var minute = -1, hour = -1;

function Fill_Circle(pen, center_x, center_y, radius, start_angle, end_angle) {
    pen.beginPath();
    pen.arc(center_x, center_y, radius, start_angle, end_angle);
    pen.fill();
}

function Bin_Change(flag) {
    if (flag == 1) {
        document.getElementById('bin').src = "/static/img/bin_select.png";
    }
    else {
        document.getElementById('bin').src = "/static/img/bin.png";
    }
}

function Next_Change(flag) {
    if (flag == 1) {
        document.getElementById('next').src = "/static/img/next_select.png";
    }
    else {
        document.getElementById('next').src = "/static/img/next.png";
    }
}

function Func_Switch(func) {
    var image_data;

    if (func == 0) {
        event = true;
        document.getElementById('pen').src = "/static/img/pen_select.png";
        document.getElementById('eraser').src = "/static/img/eraser.png";
    }
    else if (func == 1) {
        event = false;
        document.getElementById('pen').src = "/static/img/pen.png";
        document.getElementById('eraser').src = "/static/img/eraser_select.png";
    }
    else if (func == 2)
        canvas_pen.clearRect(0, 0, canvas.width, canvas.height);
    else {
        if (count == 0) {
            image_data = canvas.toDataURL("image/png").substr(22);
            Get_Res(image_data, 0);
            document.getElementById('inst').style.color = "#f4433c";
            document.getElementById('inst').innerHTML = "Draw the twelve dials.";
        }
        else if (count == 1) {
            image_data = canvas.toDataURL("image/png").substr(22);
            Get_Res(image_data, 1);
            document.getElementById('inst').style.color = "#ffbc32";
            document.getElementById('inst').innerHTML = "Draw the twelve numbers.";
        }
        else if (count == 2) {
            image_data = canvas.toDataURL("image/png").substr(22);
            Get_Res(image_data, 2);
            minute = Math.round(Math.random() * 60);
            hour = Math.round(Math.random() * 24);
            document.getElementById('inst').style.color = "#0aa858";
            document.getElementById('inst').innerHTML = "Draw the time " + hour + " : " + minute + ".";
        }
        else {
            image_data = canvas.toDataURL("image/png").substr(22);
            Get_Res(image_data, 3);
        }
        count++;
    }
}

function Get_Res(image_data, image_id) {
    $.ajax({
        type: 'POST',
        url: '/save/',
        data: {
            csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
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
}
