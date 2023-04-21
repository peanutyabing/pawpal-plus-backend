const calculateHoursSinceEvent = (event) => {
  const start = new Date(event.startTime);
  const now = new Date();
  const durationInHours = (now - start) / 1000 / 60 / 60;
  return Math.floor(durationInHours);
};

const displayTime = (timeInHours) => {
  if (timeInHours <= 1) {
    return "1 hour";
  } else if (timeInHours <= 24) {
    return `${timeInHours} hours`;
  } else {
    const timeInDays = Math.floor(timeInHours / 24);
    const dayString = timeInDays > 1 ? "days" : "day";
    const remainingHours = Math.floor(timeInHours % 24);
    const hourString = remainingHours > 1 ? "hours" : "hour";
    if (!remainingHours) {
      return `${timeInDays} ${dayString}`;
    }
    return `${timeInDays} ${dayString} ${remainingHours} ${hourString}`;
  }
};

module.exports = { calculateHoursSinceEvent, displayTime };
