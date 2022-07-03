var currentDate;

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

    // get current hour as integer 0-23 (string)
    var currentHour = currentDate.format('H');

    // TEMPORARY SETTING FOR LATE NIGHT TESTING
    // currentHour = "13";

    // get first hour on page as integer 0-23 (string)
    var firstHour = document.querySelector(".hour").dataset.hour;
    // get last hour on page as integer 0-23 (string)
    var hourElements = document.getElementsByClassName("hour"); // get all hour elements as array
    var lastHour = hourElements[hourElements.length - 1].dataset.hour; // get last item in array

    for (i = parseInt(firstHour); i < parseInt(lastHour) + 1; i++) {
        if (i < parseInt(currentHour)) {
            document.querySelector("[data-hour='" + i + "']").className = "col-2 col-lg-1 hour past";
        } else if (i === parseInt(currentHour)) {
            document.querySelector("[data-hour='" + i + "']").className = "col-2 col-lg-1 hour present";
        } else {
            document.querySelector("[data-hour='" + i + "']").className = "col-2 col-lg-1 hour future";
        };
    };
};

// when I click on a time block, I can type to enter an event/meeting
    // when I click the save button on the right (noted with an icon), save text in localStorage

// when I refresh the page, save text persists


// on page load, get date and time and color time blocks
getDate();
checkTime();

// check time and update time blocks every 5 minutes
setInterval(checkTime, 1000 * 60 * 5);