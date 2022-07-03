// GLOBAL VARIABLES

// current date and time
var currentDate;
// frequency to check time and update schedule
var checkFreq = 1000 * 60 * 5   // every 5 minutes

// FUNCTIONS

// display the current day at the top of the planner
var getDate = function() {

    // get date and format to format "Day of Week, Month Date(ordinal)" 
    currentDate = moment();
    var dateText = currentDate.format('dddd, MMMM Do');

    // add date text to page
    $("#currentDay").text(dateText); 
};

// check time and style time blocks accordingly
var checkTime = function() {
    // get the current date and time
    getDate();

    // get current hour as integer string
    var currentHour = currentDate.format('H');

    // get first hour on page
    var firstHour = $(".hour").data("hour");
    // get last hour on page as integer string
    var hourElements = document.getElementsByClassName("hour");  // get all hour elements as array
    var lastHour = hourElements[hourElements.length - 1].dataset.hour;  // get last item in array

    // add styling to each time block according to current time
    for (i = firstHour; i < lastHour + 1; i++) {
        // add .past to past hours
        if (i < parseInt(currentHour)) {
            $("[data-hour='" + i + "']").addClass("col-2 col-lg-1 hour past");
            $("[data-hour='" + i + "']").next().addClass("col-8 col-lg-10 description past");
        // add .present to the current hour
        } else if (i === parseInt(currentHour)) {
            $("[data-hour='" + i + "']").addClass("col-2 col-lg-1 hour present");
            $("[data-hour='" + i + "']").next().addClass("col-8 col-lg-10 description present");
        // add .future to future hours
        } else {
            $("[data-hour='" + i + "']").addClass("col-2 col-lg-1 hour future");
            $("[data-hour='" + i + "']").next().addClass("col-8 col-lg-10 description future");
        };
    };
};

// check local storage for a stored schedule and populate the page with events if needed
var addSchedule = function() {
    if (localStorage.getItem("storedSchedule")) {
        // if there's a schedule in local storage, get it
        var storedSchedule = JSON.parse(localStorage.getItem("storedSchedule"));

        // add any stored events to the calendar
        for (i = 0; i < storedSchedule.length; i++) {
            // get event hour and text
            var eventHour = storedSchedule[i].hour;
            var eventText = storedSchedule[i].description;
            // add event text to the textarea
            $("[data-hour='" + eventHour + "']").next().children("textarea").val(eventText);
        };
    } else {
        // otherwise, create empty array and store it
        var storedSchedule = [];
        localStorage.setItem("storedSchedule", JSON.stringify(storedSchedule));
    };
};  

// FUNCTION CALLS

// on page load, get date and time and color time blocks
getDate();
checkTime();
addSchedule();

// check time and update time blocks every 5 minutes
setInterval(checkTime, checkFreq);

// when a save button is clicked, store event text
$(".saveBtn").on("click", function(event) {
    // get schedule array from local storage
    var storedSchedule = JSON.parse(localStorage.getItem("storedSchedule"));

    // get hour of clicked row as an integer number
    var clickedHour = $(this).parent().children(".hour").data("hour");
    // get text of clicked row
    var inputText = $(this).prev().children("textarea").val().trim();

    
    for (i = 0; i < storedSchedule.length; i++) {
        // if clicked hour matches that of an existing event in the array, delete existing event
        if (clickedHour === storedSchedule[i].hour) {
            storedSchedule.splice(i,1);
        };
    };

    if (inputText) {
        // if input text isn't an empty string, create object to store hour and event description
        var eventInfo = {
            hour: clickedHour,
            description: inputText
        };

        // push object to schedule array
        storedSchedule.push(eventInfo);
    };

    // store updated array in localStorage
    localStorage.setItem("storedSchedule", JSON.stringify(storedSchedule));
});