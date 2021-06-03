
var timeDisplay = $("#currentDay");

var save9am  = $("#save9");
var save10am = $("#save10");
var save11am = $("#save11");
var save12pm = $("#save12");
var save1pm  = $("#save1");
var save2pm  = $("#save2");
var save3pm  = $("#save3");
var save4pm  = $("#save4");
var save5pm  = $("#save5");

var text9am  = $("#t9AMTextArea");
var text10am = $("#t10AMTextArea");
var text11am = $("#t11AMTextArea");
var text12pm = $("#t12PMTextArea");
var text1pm  = $("#t1PMTextArea");
var text2pm  = $("#t2PMTextArea");
var text3pm  = $("#t3PMTextArea");
var text4pm  = $("#t4PMTextArea");
var text5pm  = $("#t5PMTextArea");

function refreshTime() {
    var date = moment().format("dddd, MMMM Do YYYY");
    timeDisplay.html(date);
}

refreshTime();