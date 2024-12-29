const months = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];

function getMonth(monthAsInt) {
  // Months start as 1 so substract 1 to get the index.
  // When I say months I mean from input:date not Date().getMonth()
  return months[monthAsInt - 1];
}

// Date string is formatted YYYY-MM-DD
function formateDate(date) {
  const dateSplit = date.split("-");

  const month = getMonth(parseInt(dateSplit[1]));
  const day = dateSplit[2];
  const year = dateSplit[0];

  return month + " " + day + ", " + year + ".";
}

function formateTime(oldHours, minutes) {
  let newHours = oldHours % 12 || 12;

  let dateString = newHours + ":" + minutes;

  if (oldHours > 11) {
    dateString += "PM";
  } else {
    dateString += "AM";
  }

  return dateString;
}

export { formateDate, getMonth, formateTime };
