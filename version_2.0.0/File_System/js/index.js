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

function Left_Sym(pen, filename) {
    pen.fillStyle = '#eeeeee';
    Fill_Circle(pen, 225, 225, 185, 0, 2 * Math.PI);

    pen.strokeStyle = '#ffffff';
    pen.strokeWidth = 6;
    pen.lineWidth = 6;
    Draw_Line(pen, 50, 0, 120, 140);
    Draw_Circle(pen, 124, 148, 11, 0, 2 * Math.PI);
    Draw_Line(pen, 230, 0, 195, 105);
    Draw_Circle(pen, 192, 114, 8, 0, 2 * Math.PI);
    Draw_Line(pen, 198, 111, 420, 0);
    Draw_Line(pen, 0, 400, 150, 325);
    Draw_Circle(pen, 158, 321, 10, 0, 2 * Math.PI);
    Draw_Line(pen, 166, 325, 416, 450);
    Draw_Line(pen, 450, 380, 315, 335);
    Draw_Circle(pen, 309, 333, 6, 0, 2 * Math.PI);

    pen.strokeStyle = '#eeeeee';
    pen.strokeWidth = 2;
    pen.lineWidth = 2;
    Draw_Circle(pen, 225, 225, 200, 0, 2 * Math.PI);

    var img = new Image();
    img.src = filename;
    img.onload = function() {
        pen.drawImage(this, 125, 125, 200, 200);
    }
}

function Right_Sym(pen, filename) {
    pen.fillStyle = '#eeeeee';
    Fill_Circle(pen, 300, 225, 185, 0, 2 * Math.PI);

    pen.strokeStyle = '#ffffff';
    pen.strokeWidth = 6;
    pen.lineWidth = 6;
    Draw_Line(pen, 125, 0, 195, 140);
    Draw_Circle(pen, 199, 148, 11, 0, 2 * Math.PI);
    Draw_Line(pen, 315, 0, 270, 105);
    Draw_Circle(pen, 267, 114, 8, 0, 2 * Math.PI);
    Draw_Line(pen, 273, 111, 495, 0);
    Draw_Line(pen, 75, 400, 225, 325);
    Draw_Circle(pen, 233, 321, 10, 0, 2 * Math.PI);
    Draw_Line(pen, 241, 325, 491, 450);
    Draw_Line(pen, 525, 380, 390, 335);
    Draw_Circle(pen, 384, 333, 6, 0, 2 * Math.PI);

    pen.strokeStyle = '#eeeeee';
    pen.strokeWidth = 2;
    pen.lineWidth = 2;
    Draw_Circle(pen, 300, 225, 200, 0, 2 * Math.PI);

    var img = new Image();
    img.src = filename;
    img.onload = function() {
        pen.drawImage(this, 200, 125, 200, 200);
    }
}

function Intro_Over(flag) {
    if (flag) {
        document.getElementById('intro_url').style.color = "#ff5722";
        document.getElementById('head_intro').style.borderColor = '#ff5722';
    }
    else {
        document.getElementById('intro_url').style.color = "#4c4c4c";
        document.getElementById('head_intro').style.borderColor = '#ffffff';
    }
}

function Step_Over(flag) {
    if (flag) {
        document.getElementById('step_url').style.color = "#ff5722";
        document.getElementById('head_step').style.borderColor = '#ff5722';
    }
    else {
        document.getElementById('step_url').style.color = "#4c4c4c";
        document.getElementById('head_step').style.borderColor = '#ffffff';
    }
}

function Rule_Over(flag) {
    if (flag) {
        document.getElementById('rule_url').style.color = "#ff5722";
        document.getElementById('head_rule').style.borderColor = '#ff5722';
    }
    else {
        document.getElementById('rule_url').style.color = "#4c4c4c";
        document.getElementById('head_rule').style.borderColor = '#ffffff';
    }
}

function Try_Over(flag) {
    if (flag) {
        document.getElementById('try_url').style.color = "#ff5722";
        document.getElementById('head_try').style.borderColor = '#ff5722';
    }
    else {
        document.getElementById('try_url').style.color = "#4c4c4c";
        document.getElementById('head_try').style.borderColor = '#ffffff';
    }
}

function Clue_Over(flag) {
    if (flag)
        document.getElementById('next').style.color = "#ffffff";
    else
        document.getElementById('next').style.color = "#2d85f0";
}
