// Grab the time display element
var eTimeDisplay = $("#currentDay");

// Grab the text area elements
var aeTextAreaRows = [ $("#t9AMTextArea"),
                     $("#t10AMTextArea"),
                     $("#t11AMTextArea"),
                     $("#t12PMTextArea"),
                     $("#t1PMTextArea"),
                     $("#t2PMTextArea"),
                     $("#t3PMTextArea"),
                     $("#t4PMTextArea"),
                     $("#t5PMTextArea") ];

var nCurrentHour;  // the current hour, set by refreshTime

// Container array to store text area data
var aTextAreaContent = ["", "", "", "", "", "", "", "", ""];

// Executed on page start
// Loads text area data from local storage and inserts it into the rows
function initLoadFromLocalStorage() {

    // Hold formatted data for error checking (so I don't repeat myself)
    var aDataRetrievedFromLocalData = JSON.parse(localStorage.getItem("saved_data"));

    // Check to see if an item existed in local storage!
    if (aDataRetrievedFromLocalData !== null) { // If we have something

        // Store the data into the container array
        aTextAreaContent = aDataRetrievedFromLocalData;

        // Set the row's text area data
        for (var i = 0; i < aeTextAreaRows.length; i++) {

            aeTextAreaRows[i].text(aTextAreaContent[i]);
        }
    }
}

// Save to local storage
function saveTextAreaContentToLocalStorage(index) {
    
    // ** These ARE jQuery objects!
    // Get text content
    aTextAreaContent[index] = aeTextAreaRows[index].val();
    
    // Save to local storage
    var sStringifiedTextData = JSON.stringify(aTextAreaContent);
    localStorage.setItem("saved_data", sStringifiedTextData);
}

// Colors the rows based on the current hour
function colorCodeHours(cHour) {

    // Iterate through the rows
    for (var i = 0; i < 9; i++) { // Iterates 9 times

        var nRowHour = i + 9; // The "Hour" value of the row operated on
                              // Formatted to 24 hour time

        // Grab current row being operated on
        // ** This is a jQuery object and thus needs jQuery methods!
        var eTextAreaToColorCode = aeTextAreaRows[i];

        // RESET
        // ** We're using jQuery methods here, because textAreToColorCode points to a jQuery object!
        eTextAreaToColorCode.removeClass("past");
        eTextAreaToColorCode.removeClass("present");
        eTextAreaToColorCode.removeClass("future");

        // Update
        if (nRowHour < cHour) { // If this row has a lower "Hour" value

            eTextAreaToColorCode.addClass("past");

        } else if (nRowHour === cHour) { // If this row has the same "Hour" value

            eTextAreaToColorCode.addClass("present");

        } else { // If this row has a higher "Hour" value

            eTextAreaToColorCode.addClass("future");

        }
    }
}

// Grabs the current time using Moment
function refreshTime() {
    
    // Get the current time and date
    var sDate = moment().format("dddd, MMMM Do YYYY");

    // Store the current hour, strictly formatted into 24 hour time
    nCurrentHour = Number(moment().format("H") % 24);

    // Color the rows, and display the date
    colorCodeHours(nCurrentHour);
    eTimeDisplay.html(sDate);
} 

// Refresh the screen and currentHour every minute
var refreshEveryMinute = setInterval(refreshTime(), 60000);

// Load text area data from storage
initLoadFromLocalStorage();

// Handle event of user clicking on save button
$("#scheduleTable").on("click", function (event) {

    // Get the element clicked
    var eClickedElement = event.target; // ** eClickedElement is NOT a jQuery object!!

    // Make sure we're actually clicking a save button
    if (eClickedElement.tagName === "BUTTON") {

        var index = eClickedElement.getAttribute("data-index"); // Get the index of the button
        saveTextAreaContentToLocalStorage(index); // Save the textArea's content to local storage
    }
});