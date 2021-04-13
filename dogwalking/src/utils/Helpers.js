export const dateHelper = (setDate, setTime, setDay) => {
    //console.log("hello");
    var date = new Date().getDate(); //get current day of the month
    var month = new Date().getMonth() + 1; //get current Month
    var year = new Date().getFullYear(); // get current Year
    var hour = new Date().getHours();
    var dayOfWeek = new Date().getDay();
    var ampm = hour >= 12 ? "pm" : "am";
    hour = hour % 12;
    hour = hour ? hour : 12;
    var min = new Date().getMinutes();
    min = min < 10 ? "0" + min : min;

    setDate(month + "/" + date + "/" + year);
    // console.log(currentDate)
    setTime(hour + ":" + min + " " + ampm);
    if(dayOfWeek == 0) {
        setDay("Sunday");
    }
    else if(dayOfWeek == 1) {
        setDay("Monday");
    }
    else if(dayOfWeek == 2) {
        setDay("Tuesday");
    }
    else if(dayOfWeek == 3) {
        setDay("Wednesday");
    }
    else if(dayOfWeek == 4) {
        setDay("Thursday");
    }
    else if(dayOfWeek == 5) {
        setDay("Friday");
    }
    else if(dayOfWeek == 6) {
        setDay("Saturday");
    }
    // console.log(currentTime);
}