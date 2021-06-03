// Grab the time display element
var timeDisplay = $("#currentDay");

// Grab each row from the table, place into array
var hours = $("#scheduleTable").children();

// ! Test Button
var TEST_BUTTON = $("#change");
var tHour

// Grab the save button elements
var save9am  = $("#save9");
var save10am = $("#save10");
var save11am = $("#save11");
var save12pm = $("#save12");
var save1pm  = $("#save1");
var save2pm  = $("#save2");
var save3pm  = $("#save3");
var save4pm  = $("#save4");
var save5pm  = $("#save5");

// Grab the text area elements
var text9am  = $("#t9AMTextArea");
var text10am = $("#t10AMTextArea");
var text11am = $("#t11AMTextArea");
var text12pm = $("#t12PMTextArea");
var text1pm  = $("#t1PMTextArea");
var text2pm  = $("#t2PMTextArea");
var text3pm  = $("#t3PMTextArea");
var text4pm  = $("#t4PMTextArea");
var text5pm  = $("#t5PMTextArea");

var currentHour;

function colorCodeHours(cHour) {
    for (var i = 0; i < hours.length; i++) {
        var rowHour = i + 9; // The "Hour" value of the row operated on

        var textAreaToColorCode = hours[i].children[1].children[0]; // The textarea of the current row

        // RESET
        textAreaToColorCode.classList.remove("past");
        textAreaToColorCode.classList.remove("present");
        textAreaToColorCode.classList.remove("future");

        // Update
        if (rowHour < cHour) { // If this row has a lower "Hour" value
            textAreaToColorCode.classList.add("past");
        } else if (rowHour === cHour) { // If this row has the same "Hour" value
            textAreaToColorCode.classList.add("present");
        } else { // If this row has a higher "Hour" value
            textAreaToColorCode.classList.add("future");
        }
    }
}

function refreshTime() {
    var date = moment().format("dddd, MMMM Do YYYY HH:mm:ss");
    currentHour = Number(moment().format("H") % 24);
    console.log(currentHour);

    colorCodeHours(currentHour);
    timeDisplay.html(date);
} 

var refreshEveryMinute = setInterval(refreshTime(), 60000);
