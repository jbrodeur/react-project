function jsDate(date, time) {
    var dt = new Date(...`${date} ${time}`.split(/[- :]/));
    // BUG?? - Month seems to be off by 1...
    dt.setMonth(dt.getMonth() - 1);
    return dt;
  }
  
  function formatDate(date, time) {
    const utcSeconds = jsDate(date, time).getTime() / 1000;
    const d = new Date(0);
    d.setUTCSeconds(utcSeconds);
    return d.toLocaleDateString("en-US");
  }

  function formatTime(date, time) {
    const utcSeconds = jsDate(date, time).getTime() / 1000;
    const d = new Date(0);
    d.setUTCSeconds(utcSeconds);
    return d.toLocaleTimeString("en-US");
  }
  
  const DAY = 24 * 60 * 60 * 1000;
  const WEEK = 7 * DAY;
  
  function startOfWeek(dt) {
      const weekday = dt.getDay();
      return new Date(dt.getTime() - Math.abs(0 - weekday) * DAY);
  }
  
  function weeksBetween(d1, d2) {
      return Math.ceil((startOfWeek(d2) - startOfWeek(d1)) / WEEK);
  }

  function minuteString (time) {
    if (time === "")
      return "";
    if (time > 1) 
      return "minutes";
    else 
      return "minute";
  } 
  export {formatTime, formatDate, jsDate, minuteString, weeksBetween};
