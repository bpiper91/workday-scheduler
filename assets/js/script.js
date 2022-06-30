var currentDate;

// display the current day at the top of the planner
var getDate = function() {

    // get date and format to format "Day of Week, Month Date(ordinal)" 
    currentDate = moment();
    var dateText = currentDate.format('dddd, MMMM Do');

    // add date text to page
    $("#currentDay").text(dateText); 
};


// when I view the time blocks for the day, time blocks are color coded
    // past is gray, present is red, future is green

// when I click on a time block, I can type to enter an event/meeting
    // when I click the save button on the right (noted with an icon), save text in localStorage

// when I refresh the page, save text persists

getDate();