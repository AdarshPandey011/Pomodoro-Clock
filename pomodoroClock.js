
let session_min = 0
let session = document.getElementById("session");

let break_min = 0;
let break_d = document.getElementById("break");
var stp, b_stp;
let flag = 0;
let flag2 = 0;
var turn_flag = 0;
var pause_tag = 2;
var pause_time = 0
var id_s, id_b;
var speed = 1000;
let count = 0;
let f = 0;
let minute, second, cl;

document.getElementById("reset").disabled = true;
function session_time(choice) {
    if (choice == 1) {
        session_min++;
        if (session_min < 10) {
            session.innerHTML = "0" + session_min + " " + "min";
        }
        else {

            session.innerHTML = session_min + " " + "min";
        }
    }
    else {
        if (session_min == 0) {
            alert("Time can't be negative!!");
        }
        else {
            session_min--;
            if (session_min < 10) {
                session.innerHTML = "0" + session_min + " " + "min";
            }
            else {

                session.innerHTML = session_min + " " + "min";
            }
        }
    }

    if (session_min > 0) {
        document.getElementById("start").disabled = false;
    }

}



function break_time(choice) {
    if (choice == 1) {
        break_min++;
        if (break_min < 10) {
            break_d.innerHTML = "0" + break_min + " " + "min";
        }
        else {

            break_d.innerHTML = break_min + " " + "min";
        }
    }
    else {
        if (break_min == 0) {
            alert("Time can't be negative!!");
        }
        else {
            break_min--;
            if (break_min < 10) {
                break_d.innerHTML = "0" + break_min + " " + "min";
            }
            else {

                break_d.innerHTML = break_min + " " + "min";
            }
        }
    }

}
var session_label = document.getElementById("session_label");
function break_timer(bool) {
    pause_tag = 1;
    var timer;
    if (bool) {
        timer = break_min * 60;
    }
    else {
        timer = pause_time;
    }

    if (timer == 0) {
        start_timer(true);
        return;
    }



    minute = parseInt(timer / 60);
    second = timer % 60;
    if (minute < 10) {
        minute = "0" + minute;
    }

    if (second < 10) {
        second = "0" + second;
    }
    cl.innerHTML = minute + ":" + second;
    document.getElementById("display").style.border = " 8px solid red";
    cl.setAttribute("class", "text-danger");
    session_label.setAttribute("class", "text-danger");
    session_label.innerText = "Break " + count;
    timer -= 1;



    id_b = setInterval(function () {
        let minute, second, cl;
        cl = document.getElementById("clock");
        if (timer == 0) {
            clearInterval(id_b);
            start_timer(true);
        }

        pause_time = timer;
        minute = parseInt(timer / 60);
        second = timer % 60;
        if (minute < 10) {
            minute = "0" + minute;
        }

        if (second < 10) {
            second = "0" + second;
        }
        cl.innerHTML = minute + ":" + second;
        document.getElementById("display").style.border = " 8px solid red";
        cl.setAttribute("class", "text-danger");
        session_label.setAttribute("class", "text-danger");
        session_label.innerText = "Break " + count;
        timer--;

    }, speed)

}

cl = document.getElementById("clock");

function start_timer(bool) {
    pause_tag = 0;
    var timer;
    if (bool) {
        count++;

        timer = session_min * 60;
    }
    else {
        timer = pause_time;
    }

    if (timer == 0) {
        break_timer(true);
        return;
    }


    //timer -= 1;
    minute = parseInt(timer / 60);
    second = timer % 60;

    if (minute < 10) {
        minute = "0" + minute;
    }

    if (second < 10) {
        second = "0" + second;
    }
    cl.innerHTML = minute + ":" + second;
    document.getElementById("display").style.border = " 8px solid rgb(25, 159, 174)"
    cl.setAttribute("class", "text-info");
    session_label.setAttribute("class", "text-info");
    session_label.innerText = "Session " + count;

    timer -= 1;

    id_s = setInterval(function () {
        //let minute, second, cl;
        //cl = document.getElementById("clock");
        if (timer == 0) {
            clearInterval(id_s);
            break_timer(true);
        }

        pause_time = timer;
        minute = parseInt(timer / 60);
        second = timer % 60;

        if (minute < 10) {
            minute = "0" + minute;
        }

        if (second < 10) {
            second = "0" + second;
        }
        cl.innerHTML = minute + ":" + second;
        document.getElementById("display").style.border = " 8px solid rgb(25, 159, 174)"
        cl.setAttribute("class", "text-info");
        session_label.setAttribute("class", "text-info");
        session_label.innerText = "Session " + count;
        timer--;
    }, speed)



}
var s = document.getElementById("start");

function start() {

    var tb = document.getElementsByClassName("tb");
    if (pause_tag == 2) {
        if (session_min == 0 && break_min == 0) {
            alert("kindly enter time !!");
            return;
        }
    }
    document.getElementById("reset").disabled = false;

    for (var i = 0; i < tb.length; i++) {
        tb[i].disabled = true;
    }
    if (s.innerHTML == "Start") {
        s.innerText = "Pause";
        if (pause_tag == 2) {
            if (session_min != 0 || break_min != 0) {
                start_timer(true);
            }
        }
        else if (pause_tag == 0) {
            start_timer(false);
        }
        else {
            break_timer(false);
        }

    }
    else {
        s.innerText = "Start";
        if (pause_tag == 0) {
            clearInterval(id_s);
        }
        else {
            clearInterval(id_b);
        }
    }

}

function reset() {
    cl = document.getElementById("clock");
    clearInterval(id_s);
    clearInterval(id_b);
    document.getElementById("clock").innerHTML = "00" + ":" + "00";
    document.getElementById("session").innerHTML = "00 min";
    document.getElementById("break").innerHTML = "00 min";
    s.innerText = "Start";
    session_min = 0
    break_min = 0;
    pause_tag = 2
    var tb = document.getElementsByClassName("tb");
    for (var i = 0; i < tb.length; i++) {
        tb[i].disabled = false;
    }
    document.getElementById("display").style.border = " 8px solid rgb(25, 159, 174)";
    cl.setAttribute("class", "text-info");

    session_label.setAttribute("class", "text-info");
    session_label.innerText = "Session";
    count = 0;


}


